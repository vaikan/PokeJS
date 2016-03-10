/**
 * store pokedex index to the local storage
 * @param  {Object} pokedexObj    pokedex index object
 */
function storePokedex(pokedexObj) {
  if (!window.localStorage) {
    console.log('no localstorage support');
  } else {
    var jsonString = JSON.stringify(pokedexObj);

    if (localStorage.getItem('Pokedex') === null) {
      localStorage.setItem('Pokedex', jsonString);
      console.log('New key "Pokedex" added to Local Storage');
    } else {
      console.log('Pokedex is present in localStorage');
    }
  }
}

/**
 * retrieve pokedex details from the local storage
 */
function retrievePokedex() {
  if (!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var data = localStorage.getItem('Pokedex');
    var parseJSON = JSON.parse(data);
    return parseJSON;
  }
}
