/**
 * get Pokemon resource URI from the Pokedex and send it to getPokeDetails function
 * @param  {String}   name     name of the pokemon
 * @param  {Function} callback
 * @return {Object}            pokemon details
 */
function getPokemon(name, callback) {
  var sendURI;
  var url = 'http://pokeapi.co/api/v1/pokedex/1';

  $.ajax({
    url: url,
    type: 'GET',
    error: function(jqXHR, textStatus, errorThrown) {
      if (textStatus === 'error') {
        console.log(textStatus);
      }
    },
    success: function(data) {
      for (var p in data.pokemon) {
        var pokename = data.pokemon[p].name;
        if (name.toLowerCase() === pokename) {
          sendURI = data.pokemon[p].resource_uri;
        }
      }
      var sendCallback = function(data) {
        callback(data);
      };
      getPokeDetails(sendURI, sendCallback);
    }
  });
}

/**
 * gets Pokemon details from the Pokedex
 * @param  {String}   uri      Pokemon resource URI
 * @param  {Function} callback
 * @return {Object}            Pokemon details
 */
function getPokeDetails(uri, callback) {
  var url = 'http://pokeapi.co/' + uri;

  $.ajax({
    url: url,
    type: 'GET',
    error: function(jqXHR, textStatus, errorThrown) {
      if (textStatus === 'error') {
        console.log(textStatus);
      }
    },
    success: function(data) {
      callback(data);
    }
  });
}
