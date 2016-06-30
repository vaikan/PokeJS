/**
 * get Pokemon resource URI from the Pokedex and send it to getPokeDetails function
 * @param  {string}   name     name of the pokemon
 * @return {object}            pokemon details
 */
function getPokemon(name) {
  if (localStorage.getItem('Pokedex') !== null) {
    $.snackbar({content: "Pokedex present in Local Storage", timeout: 10000});
    getRandomPokemon();
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
        db.storeData(data, 'Pokedex');
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
  var pokedexObj = db.getData('Pokedex');
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
      setPokedexTemplate(data);
    }
  });
}

function getRandomPokemon() {
  var random1 = Math.floor(Math.random() * (721));
  var random2 = Math.floor(Math.random() * (721));
  var random3 = Math.floor(Math.random() * (721));

  var randomNumberArr = [random1, random2, random3];
  var pokemonList = db.getData('Pokedex');
  var pokeEntry = pokemonList.pokemon_entries;
  var data = [];

  for (var p in pokeEntry) {
    var pokeid = pokeEntry[p].entry_number;

    for (var num in randomNumberArr) {
      if (pokeid === randomNumberArr[num]) {
        data.push({
          'pokeid':pokeid,
          'name':pokeEntry[p].pokemon_species.name,
          'url':pokeEntry[p].pokemon_species.url
        });
      }
    }
  }
  setPokemonTemplate(data);
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

function setPokedexTemplate(dataObj) {
  $('#pokedex-table').empty();
  var theTemplateScript = $('#poke-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#pokedex-table").append(theTemplate(dataObj));

  var url = 'http://pokeapi.co/api/v2/pokemon/'+dataObj.id;
  getPokemonStats(url);
}

function setPokemonStatsTemplate(data) {
  $("#pokestats-table").empty();
  var theTemplateScript = $('#pokestats-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#pokestats-table").append(theTemplate(data));
  $('#poke-sprite').attr('src', data.sprites.front_default);
}

function setPokemonTemplate(data) {
  $("#pokemon-table").empty();
  var theTemplateScript = $('#pokemon-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#pokemon-table").append(theTemplate(data));
  $('.details').click(function() {
    var name = $(this).data('name');
    getPokeDetails(name);
  });
}
