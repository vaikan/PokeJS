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
      const template = Handlebars.compile(tmpl);
      $("#region-table").append(template(dataObj));
      $(".details").click(function () {
        const uri = $(this).data("url");
        const name = $(this).data("name");
        getRegionDetails(uri, name);
      });
    },
    "html"
  );
}

function sortRegionFeatures(regionsData) {
  const pop_center = [];
  const forest = [];
  const cave = [];
  const island = [];
  const route = [];
  const mountains = [];
  const tower = [];
  const lake = [];
  const other_features = [];

  for (let index in regionsData.locations) {
    const location = regionsData.locations[index].name;
    if (
      location.search("city") != -1 ||
      location.search("town") != -1 ||
      location.search("village") != -1
    ) {
      pop_center.push(location);
    } else if (location.search("forest") != -1) {
      forest.push(location);
    } else if (location.search("cave") != -1) {
      cave.push(location);
    } else if (
      location.search("route") != -1 ||
      location.search("road") != -1 ||
      location.search("tunnel") != -1 ||
      location.search("bridge") != -1
    ) {
      route.push(location);
    } else if (location.search("island") != -1) {
      island.push(location);
    } else if (
      location.search("mountain") != -1 ||
      location.search("mt-") != -1 ||
      location.search("mount") != -1
    ) {
      mountains.push(location);
    } else if (location.search("lake") != -1) {
      lake.push(location);
    } else if (location.search("tower") != -1) {
      tower.push(location);
    } else {
      other_features.push(location);
    }
  }
  const sortedData = {
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
      const template = Handlebars.compile(tmpl);
      $("#sortedfeatures-body").append(template(dataObj));
      $("#sortedfeatures-modal").modal();
    },
    "html"
  );
}
