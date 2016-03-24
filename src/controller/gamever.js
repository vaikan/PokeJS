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
        for (var v in data.results) {
          var dat = data.results;
          var url = dat[v].url;
          getGameDetails(url);
        }
      }
    });
  }
}

function getGameVersionDetails(url, name) {
  retrieveGameVersionsModalDetails(name);
}

function setVersionTemplate(dataObj) {
  var parseJSON = JSON.parse(dataObj);
  var theTemplateScript = $('#ver-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#version-table").append(theTemplate(parseJSON));
  $('.details').click(function() {
    var uri = $(this).data('url');
    var name = $(this).data('name');
    getGameVersionDetails(uri, name);
  });
}

function setVersionDetailsTemplate(dataObj) {
  $('#gamever-body').empty();
  var parseJSON = JSON.parse(dataObj);
  var theTemplateScript = $('#verdetails-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#gamever-body").append(theTemplate(parseJSON));
  $('#gamever-modal').modal();
}
