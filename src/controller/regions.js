/**
 * get regions details
 */
async function getRegions() {
  if (localStorage.getItem("Regions") !== null) {
    console.log('"Regions" present in Local Storage');
  } else {
    const url = "https://pokeapi.co/api/v2/region/";
    const regions = await fetch(url).then((response) => response.json());

    db.storeData(regions, "Regions");
    const res = db.getData("Regions");
    setRegionTemplate(res);
  }
}

function getRegionDetails(url, name) {
  pokeDB.fetchData(name, "region", async (pokedata) => {
    if (pokedata !== undefined) {
      sortRegionFeatures(pokedata);
    } else {
      const regionsDetails = await fetch(url).then((response) =>
        response.json()
      );

      const dataObj = {
        name: name,
        locations: regionsDetails.locations,
      };
      pokeDB.createData(dataObj, "region");
      pokeDB.fetchData(name, "region", (data) => {
        sortRegionFeatures(data);
      });
    }
  });
}

function setRegionTemplate(dataObj) {
  $.get(
    "../template/regions_tmpl.hbs",
    function (tmpl) {
      var template = Handlebars.compile(tmpl);
      $("#region-table").append(template(dataObj));
      $(".details").click(function () {
        var uri = $(this).data("url");
        var name = $(this).data("name");
        getRegionDetails(uri, name);
      });
    },
    "html"
  );
}

function sortRegionFeatures(dataObj) {
  var pop_center = [];
  var forest = [];
  var cave = [];
  var island = [];
  var route = [];
  var mountains = [];
  var tower = [];
  var lake = [];
  var other_features = [];

  for (var v in dataObj.locations) {
    var loc = dataObj.locations[v].name;
    if (
      loc.search("city") != -1 ||
      loc.search("town") != -1 ||
      loc.search("village") != -1
    ) {
      pop_center.push(loc);
    } else if (loc.search("forest") != -1) {
      forest.push(loc);
    } else if (loc.search("cave") != -1) {
      cave.push(loc);
    } else if (
      loc.search("route") != -1 ||
      loc.search("road") != -1 ||
      loc.search("tunnel") != -1 ||
      loc.search("bridge") != -1
    ) {
      route.push(loc);
    } else if (loc.search("island") != -1) {
      island.push(loc);
    } else if (
      loc.search("mountain") != -1 ||
      loc.search("mt-") != -1 ||
      loc.search("mount") != -1
    ) {
      mountains.push(loc);
    } else if (loc.search("lake") != -1) {
      lake.push(loc);
    } else if (loc.search("tower") != -1) {
      tower.push(loc);
    } else {
      other_features.push(loc);
    }
  }
  var sortedData = {
    population_centers: pop_center,
    routes: route,
    other_features: other_features,
    islands: island,
    caves: cave,
    forests: forest,
    mountains: mountains,
    towers: tower,
    lakes: lake,
  };

  setSortedFeaturesTemplate(sortedData);
}

function setSortedFeaturesTemplate(dataObj) {
  $("#sortedfeatures-body").empty();

  $.get(
    "../template/regiondetails_tmpl.hbs",
    function (tmpl) {
      var template = Handlebars.compile(tmpl);
      $("#sortedfeatures-body").append(template(dataObj));
      $("#sortedfeatures-modal").modal();
    },
    "html"
  );
}
