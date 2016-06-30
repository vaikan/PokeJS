/**
 * storeRegions store pokemon regions in the local storage
 * @param  {Object} regionObj region data object
 */
function storeRegions(regionObj) {
  var jsonString = JSON.stringify(regionObj);
  if (localStorage.getItem('Regions') === null) {
    localStorage.setItem('Regions', jsonString);
    console.log('New key "Regions" added to Local Storage');
    retrieveRegions();
  } else {
    console.log('"Regions" is already in Local Storage');
  }
  console.log('storeRegions model');
}

/**
 * storeRegionDetails store all region's details in the local storage
 * @param  {Object} regionObj region data object
 * @param  {String} name      region name string
 */

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

/**
 * retrieveRegions retrieve region data from the local storage
 */
function retrieveRegions() {
  var res = db.getData('Regions');
  setRegionTemplate(res);
}

/**
 * retrieveRegionDetails retrieve specific region details from the local storage
 * @param  {String} indexName region indexname for retrieving region data
 */
function retrieveRegionDetails(indexName) {
  var data = localStorage.getItem(indexName);
  var parseJSON = JSON.parse(data);
  sortRegionFeatures(parseJSON);
}
