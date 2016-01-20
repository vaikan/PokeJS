/**
 * get Pokemon resource URI from the Pokedex and send it to getPokeDetails function
 * @param  {String}   name     name of the pokemon
 * @param  {Function} callback
 * @return {Object}            pokemon details
 */
function getPokemon(name, callback) {
  var sendURI;
  var url = 'http://pokeapi.co/api/v1/pokedex/1';
  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function getPokedex() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = httpRequest.response;
        var parsedResponse  = JSON.parse(response);
        for (var p in parsedResponse.pokemon) {
          var pokename = parsedResponse.pokemon[p].name;
          if (name.toLowerCase() === pokename) {
            sendURI = parsedResponse.pokemon[p].resource_uri;
          }
        }
        var sendCallback = function(parsedResponse) {
          callback(parsedResponse);
        };
        getPokeDetails(sendURI, sendCallback);
      } else {
        var data = 'Could not get the result';
        callback(data);
      }
    }
  };

  httpRequest.open('GET', url);
  httpRequest.send();
}

/**
 * gets Pokemon details from the Pokedex
 * @param  {String}   uri      Pokemon resource URI
 * @param  {Function} callback
 * @return {Object}            Pokemon details
 */
function getPokeDetails(uri, callback) {
  var url = 'http://pokeapi.co/' + uri;
  var httpRequest = new XMLHttpRequest();
  var parsedResponse;

  httpRequest.onreadystatechange = function getResult() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = httpRequest.response;
        var parsedResponse  = JSON.parse(response);
        callback(parsedResponse);
        //var desc_uri = parsedResponse.descriptions[0].resource_uri;
        //getPokeDescription(desc_uri);
      } else {
        var data = 'Could not get the result';
        callback(data);
      }
    }
  };

  httpRequest.open('GET', url);
  httpRequest.send();
}

/*function getPokeDescription(uri) {
  var request_uri = 'http://pokeapi.co/'+uri;
  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function getDesc() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = httpRequest.response;
        var parsedResponse  = JSON.parse(response);
        console.log(parsedResponse);
      } else {
        var data = 'Could not get the result';
        callback(data);
      }
    }
  };

  httpRequest.open('GET', request_uri);
  httpRequest.send();
}*/
