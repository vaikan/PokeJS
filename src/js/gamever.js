/**
 * get and store game version details
 * @param  {string} url resource url for game versions
 */
function getGameDetails(url) {
  $.ajax({
    url: url,
    type: 'GET',
    error: function(jqXHR, textStatus, errorThrown) {
      if (textStatus === 'error') {
        console.log(textStatus);
      }
    },
    success: function(data) {
      storeGameDetails(data);
    }
  });
}

/**
 * get game version-group details
 */
function getVersionNames() {
  if (localStorage.getItem('Game-Version') !== null) {
    console.log('"Game-Version" present in Local Storage');
  } else {
    var url = 'http://pokeapi.co/api/v2/version-group/';
    $.ajax({
      url: url,
      type: 'GET',
      error: function(jqXHR, textStatus, errorThrown) {
        if (textStatus === 'error') {
          console.log(textStatus);
        }
      },
      success: function(data) {
        storeGameVersions(data);
        for (var v in data) {
          var url = data[v].url;
          getGameDetails(url);
        }
      }
    });
  }
}
