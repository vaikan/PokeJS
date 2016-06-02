/**
 * store pokedex index to the local storage
 * @param  {Object} pokedexObj    pokedex index object
 */
function storePokedex(pokedexObj) {
  var jsonString = JSON.stringify(pokedexObj);

  if (localStorage.getItem('Pokedex') === null) {
    localStorage.setItem('Pokedex', jsonString);
    console.log('New key "Pokedex" added to Local Storage');
  } else {
    $.snackbar({content: "'Pokedex' is present in LocalStorage", timeout: 10000});
  }
}

/**
 * retrievePokedex retrieve pokedex details from the local storage
 * @return {Object} parsed JSON data objects
 */
function retrievePokedex() {
  var data = localStorage.getItem('Pokedex');
  var parseJSON = JSON.parse(data);
  return parseJSON;
}

/**
 * retrievePokemonNames retrieve pokemon names from the local storage
 * @return {Object} parsed JSON data objects
 */
function retrievePokemonNames() {
  var data = localStorage.getItem('Pokedex');
  var parseJSON = JSON.parse(data);
  return parseJSON;
}
