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

function retrievePokedex() {
  if (!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var data = localStorage.getItem('pokedex');
    var parseJSON = JSON.parse(data);
    return parseJSON;
  }
}
