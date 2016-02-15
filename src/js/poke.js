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
        //var totalPokemon = data.pokemon_entries.length;
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
        $('#type-body').empty();
        var callback = function(data) {
          var theTemplateScript = $('#type-template').html();
          var theTemplate = Handlebars.compile(theTemplateScript);
          $("#type-body").append(theTemplate(data));
        };
        getPokeData(uri, callback);
        $("#typeModal").modal();
      });

      $('.showdetails').click(function() {
        $('#myModal').modal();
      });

      //getDescription(description, callback);
    }
  });
}

/**
 * get pokemon data (type, ablities)
 * @param  {string}   uri      resource uri for the pokemon data
 * @param  {Function} callback
 */
function getPokeData(uri, callback) {
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

/**
 * get Pokemon description
 * @param  {string}   description resource uri for pokemon description
 * @param  {Function} callback
 */
function getDescription(description, callback) {
  var url = 'http://pokeapi.co/' + description;
  $.ajax({
    url: url,
    type: 'GET',
    error: function(jqXHR, textStatus, errorThrown) {
      if (textStatus === 'error') {
        console.log(textStatus);
      }
    },
    success: function(data) {
      callback(data.description);
    }
  });
}
