getGameDetails = function(url) {
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
};

getVersionNames = function() {
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
};
