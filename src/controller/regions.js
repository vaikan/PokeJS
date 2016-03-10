/**
 * get regions details
 */
function getRegions() {
  if (localStorage.getItem('Regions') !== null) {
    console.log('"Regions" present in Local Storage');
  } else {
    var url = 'http://pokeapi.co/api/v2/region/';
    $.ajax({
      url: url,
      type: 'GET',
      error: function(jqXHR, textStatus, errorThrown) {
        if (textStatus === 'error') {
          console.log(textStatus);
        }
      },
      success: function(data) {
        console.log(data);
        storeRegions(data);
      }
    });
  }
}

function getRegionDetails(url, name) {
  if (localStorage.getItem('Region-'+name) !== null) {
    var indexName = 'Region-'+name;
    retrieveRegionDetails(indexName);
  } else {
    $.ajax({
      url: url,
      type: 'GET',
      error: function(jqXHR, textStatus, errorThrown) {
        if (textStatus === 'error') {
          console.log(textStatus);
        }
      },
      success: function(data) {
        storeRegionDetails(data.locations, name);
        // TODO: add function for region details modal template
      }
    });
  }
}

function setRegionTemplate(dataObj) {
  var theTemplateScript = $('#region-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#region-table").append(theTemplate(dataObj));
  $('.details').click(function() {
    var uri = $(this).data('url');
    var name = $(this).data('name');
    getRegionDetails(uri, name);
  });
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
    if (loc.search('city') != -1 || loc.search('town') != -1 || loc.search('village') != -1) {
      pop_center.push(loc);
    } else if (loc.search('forest') != -1) {
      forest.push(loc);
    } else if (loc.search('cave') != -1) {
      cave.push(loc);
    } else if (loc.search('route') != -1 || loc.search('road') != -1 || loc.search('tunnel') != -1 || loc.search('bridge') != -1) {
      route.push(loc);
    } else if (loc.search('island') != -1) {
      island.push(loc);
    } else if (loc.search('mountain') != -1 || loc.search('mt-') != -1 || loc.search('mount') != -1) {
      mountains.push(loc);
    } else if (loc.search('lake') != -1) {
      lake.push(loc);
    } else if (loc.search('tower') != -1) {
      tower.push(loc);
    } else {
      other_features.push(loc);
    }
  }
  console.log('centers: ' + pop_center.length);
  console.log(pop_center);
  console.log('routes: ' + route.length);
  console.log(route);
  console.log('other_feautures: ' + other_features.length);
  console.log(other_features);
  console.log('island: ' + island.length);
  console.log(island);
  console.log('caves: ' + cave.length);
  console.log(cave);
  console.log('forest: ' + forest.length);
  console.log(forest);
  console.log('mountains: ' + mountains.length);
  console.log(mountains);
  console.log('tower: ' + tower.length);
  console.log(tower);
  console.log('lake: ' + lake.length);
  console.log(lake);
}
