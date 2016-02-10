/**
 * store pokemon gameversion to the local storage
 * @param  {Object} versionObj pokemon game version object
 */
function storeGameVersions(versionObj) {
  if (!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var jsonString = JSON.stringify(versionObj);
    if (localStorage.getItem('version') === null) {
      localStorage.setItem('version', jsonString);
    } else {
      var prevData = localStorage.getItem('version');
      if (prevData === null) {
        localStorage.setItem('version', jsonString);
      } else {
        localStorage.setItem('version', prevData + ',' + jsonString);
      }
    }
  }
}

/**
 * retrieve game version from the local storage
 */
function retrieveGameVersions() {
  if (!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var data = '{"versions": [' + localStorage.getItem('version') + ']}';
    var parseJSON = JSON.parse(data);

    var theTemplateScript = $('#ver-template').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $("#version-table").append(theTemplate(parseJSON));
  }
}

/**
 * store pokedex index to the local storage
 * @param  {Object} pokedexObj    pokedex index object
 */
function storePokedex(pokedexObj) {
  if (!window.localStorage) {
    console.log('no localstorage support');
  } else {
    var jsonString = JSON.stringify(pokedexObj);

    if (localStorage.getItem('pokedex') === null) {
      localStorage.setItem('pokedex', jsonString);
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
    var data = localStorage.getItem('pokedex');
    var parseJSON = JSON.parse(data);
    return parseJSON;
  }
}
