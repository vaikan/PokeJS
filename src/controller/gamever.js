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
        db.storeData(data, 'Game-Version');
        var res = db.getData('Game-Version');
        var resString = JSON.stringify(res);
        var formatttedData = '{"versions":' + resString + '}';
        setVersionTemplate(formatttedData);
      }
    });
  }
}

function getGameVersionDetails(url, name) {
  $.ajax({
    url: url,
    type: 'GET',
    error: function(jqXHR, textStatus, errorThrown) {
      if (textStatus === 'error') {
        console.log(textStatus);
      }
    },
    success: function(data) {
      var storeName = 'Game-Version-'+name;
      db.storeData(data, storeName);
      var res = db.getData(storeName);
      console.log(res);
      setVersionDetailsTemplate(res);
    }
  });
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
  var theTemplateScript = $('#verdetails-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  $("#gamever-body").append(theTemplate(dataObj));
  $('#gamever-modal').modal();
}
