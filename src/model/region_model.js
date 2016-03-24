function storeRegions(regionObj) {
  var jsonString = JSON.stringify(regionObj);
  if (localStorage.getItem('Regions') === null) {
    localStorage.setItem('Regions', jsonString);
    console.log('New key "Regions" added to Local Storage');
    retrieveRegions();
  } else {
    console.log('"Regions" is already in Local Storage');
  }
}

function storeRegionDetails(regionObj, name) {
  var jsonString = '{"locations": ' + JSON.stringify(regionObj) + '}';
  if (localStorage.getItem('Region-'+name) === null) {
    localStorage.setItem('Region-'+name, jsonString);
    console.log('New key "Region-'+ name +'" added to Local Storage');
    var indexName = 'Region-'+name;
    retrieveRegionDetails(indexName);
  } else {
    console.log('"Region-'+ name +'" is already in Local Storage');
  }
}

function retrieveRegions() {
  var data = localStorage.getItem('Regions');
  var parseJSON = JSON.parse(data);
  setRegionTemplate(parseJSON);
}

function retrieveRegionDetails(indexName) {
  var data = localStorage.getItem(indexName);
  var parseJSON = JSON.parse(data);
  sortRegionFeatures(parseJSON);
}
