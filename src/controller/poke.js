/**
 * get Pokemon resource URI from the Pokedex and send it to getPokeDetails function
 * @param  {string}   name     name of the pokemon
 * @return {object}            pokemon details
 */
function getPokemon(name) {
  if (localStorage.getItem('Pokedex') !== null) {
    console.log('Pokedex present in Local Storage');
  } else {
    var sendURI;
    var url = 'http://pokeapi.co/api/v2/pokedex/1';
    $.ajax({
      url: url,
      type: 'GET',
      error: function(jqXHR, textStatus, errorThrown) {
        if (textStatus === 'error') {
          console.log(textStatus);
        }
      },
      success: function(data) {
        storePokedex(data);
        // TODO: find a way to add all pokemon data into user stored db like indexed db.
      }
    });
  }
}

/**
 * gets Pokemon details from the Pokedex
 * @param  {string}   name      Pokemon resource URI
 * @return {Object}            Pokemon details
 */
function getPokeDetails(name) {
  var url;
  var pokedexObj = retrievePokedex();
  var pokeEntry = pokedexObj.pokemon_entries;

  for (var p in pokeEntry) {
    var pokename = pokeEntry[p].pokemon_species.name;

    if (name.toLowerCase() === pokename) {
      url = pokeEntry[p].pokemon_species.url;
    }
  }

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
      setPokedexTemplate(data);
    }
  });
}

function getAllPokeDetails() {
  var url;
  var pokedexObj = retrievePokedex();
  var pokeEntry = pokedexObj.pokemon_entries;

  for (var p in pokeEntry) {
    var pokename = pokeEntry[p].pokemon_species.name;
    url = pokeEntry[p].pokemon_species.url;
    getDetailsAJAX(pokename, url);
  }
}

function getDetailsAJAX(pokename, url) {
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
    }
  });
}

function setPokedexTemplate(dataObj) {
  var theTemplateScript = $('#poke-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#pokedex-table").append(theTemplate(dataObj));


  $('.stats').click(function() {
    var pokeid = $(this).data('pokeid');
    var url = 'http://pokeapi.co/api/v2/pokemon/'+pokeid;
    getPokemonStats(url);
  });
}

function getPokemonStats(url) {
  $.ajax({
    url: url,
    type: 'GET',
    error: function(jqXHR, textStatus, errorThrown) {
      if (textStatus === 'error') {
        console.log(textStatus);
      }
    },
    success: function(data) {
      setPokemonStatsTemplate(data);
    }
  });
}

function setPokemonStatsTemplate(data) {
  var theTemplateScript = $('#pokestats-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#pokestats-table").append(theTemplate(data));
}
