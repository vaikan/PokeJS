/**
 * get game version-group details
 */
async function getVersionNames() {
  if (localStorage.getItem("Game-Version") !== null) {
    console.log('"Game-Version" present in Local Storage');
  } else {
    const url = "https://pokeapi.co/api/v2/version-group/";
    const versions = await fetch(url).then((response) => response.json());

    db.storeData(versions, "Game-Version");
    const res = db.getData("Game-Version");
    const resString = JSON.stringify(res);
    const formatttedData = '{"versions":' + resString + "}";
    setVersionTemplate(formatttedData);
  }
}

function getGameVersionDetails(url, name) {
  pokeDB.fetchData(name, "game", async (pokedata) => {
    if (pokedata !== undefined) {
      setVersionDetailsTemplate(pokedata.data);
    } else {
      const versionsDetails = await fetch(url).then((response) =>
        response.json()
      );
      const dataObj = { name: name, data: versionsDetails };
      pokeDB.createData(dataObj, "game");
      pokeDB.fetchData(name, "game", function (data) {
        setVersionDetailsTemplate(data.data);
      });
    }
  });
}

function setVersionTemplate(dataObj) {
  var parseJSON = JSON.parse(dataObj);

  $.get(
    "../template/gameversion_tmpl.hbs",
    function (tmpl) {
      var template = Handlebars.compile(tmpl);
      $("#version-table").append(template(parseJSON));
      $(".details").click(function () {
        var uri = $(this).data("url");
        var name = $(this).data("name");
        getGameVersionDetails(uri, name);
      });
    },
    "html"
  );
}

function setVersionDetailsTemplate(dataObj) {
  $("#gamever-body").empty();

  $.get(
    "../template/gameversion_details_tmpl.hbs",
    function (tmpl) {
      var template = Handlebars.compile(tmpl);
      $("#gamever-body").append(template(dataObj));
      $("#gamever-modal").modal();
    },
    "html"
  );
}
