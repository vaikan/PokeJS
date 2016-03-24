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
 * retrieve pokedex details from the local storage
 */
function retrievePokedex() {
  var data = localStorage.getItem('Pokedex');
  var parseJSON = JSON.parse(data);
  return parseJSON;
}

function retrievePokemonNames() {
  var data = localStorage.getItem('Pokedex');
  var parseJSON = JSON.parse(data);
  return parseJSON;
}
