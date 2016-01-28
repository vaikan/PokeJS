/**
 * get Pokemon resource URI from the Pokedex and send it to getPokeDetails function
 * @param  {string}   name     name of the pokemon
 * @return {object}            pokemon details
 */
function getPokemon(name) {
  if (localStorage.getItem('pokedex') !== null) {
    console.log('Pokedex present in Local Storage');
  } else {
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
        storePokedex(data);
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

  for (var p in pokedexObj.pokemon) {
    var pokename = pokedexObj.pokemon[p].name;
    if (name.toLowerCase() === pokename) {
      url = 'http://pokeapi.co/' + pokedexObj.pokemon[p].resource_uri;
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
      var theTemplateScript = $('#poke-template').html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      Handlebars.registerPartial('moves', $('#moves-partial').html());
      $("#pokedex-table").append(theTemplate(data));

      $('.evolve').click(function() {
        var name = $(this).data('name');
        $('#pokedex-table').empty();
        getPokeDetails(name.toLowerCase());
        $('#pokedex-table').DataTable();
      });

      $('.details').click(function() {
        var uri = $(this).data('uri');
        getPokeData(uri);
      });

      $('.showdetails').click(function () {
        $('#myModal').modal();
      });
    }
  });
}

function getPokeData(uri) {
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
      console.log(data);
      /*var theTemplateScript = $('#poke-template').html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      Handlebars.registerPartial('moves', $('#moves-partial').html());
      $("#pokedex-table").append(theTemplate(data));

      $('.evolve').click(function() {
        var name = $(this).text();
        $('#pokedex-table').empty();
        getPokeDetails(name.toLowerCase());
        $('#pokedex-table').DataTable();
      });

      $('.details').click(function() {
        var uri = $(this).data('uri');
        getPokeData(uri);
      });

      $('.showdetails').click(function () {
        $('#myModal').modal();
      });*/
    }
  });
}
