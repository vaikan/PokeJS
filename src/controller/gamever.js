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
  pokeDB.fetchData(name, 'game', function(pokedata){
    if (pokedata !== undefined) {
      setVersionDetailsTemplate(pokedata.data);
    } else {
      $.ajax({
        url: url,
        type: 'GET',
        error: function(jqXHR, textStatus, errorThrown) {
          if (textStatus === 'error') {
            console.log(textStatus);
          }
        },
        success: function(data) {
          var data = '{"name": "'+ name +'","data": ' + JSON.stringify(data) + '}';
          pokeDB.createData(JSON.parse(data), 'game');
          pokeDB.fetchData(name, 'game', function(pokedata){
            setVersionDetailsTemplate(pokedata.data);
          });
        }
      });
    }
  });
}

function setVersionTemplate(dataObj) {
  var parseJSON = JSON.parse(dataObj);

  $.get('../template/gameversion_tmpl.hbs', function (tmpl) {
      var template = Handlebars.compile(tmpl);
      $('#version-table').append(template(parseJSON));
      $('.details').click(function() {
        var uri = $(this).data('url');
        var name = $(this).data('name');
        getGameVersionDetails(uri, name);
      });
  }, 'html')
}

function setVersionDetailsTemplate(dataObj) {
  $('#gamever-body').empty();

  $.get('../template/gameversion_details_tmpl.hbs', function (tmpl) {
      var template = Handlebars.compile(tmpl);
      $('#gamever-body').append(template(dataObj));
      $('#gamever-modal').modal();
  }, 'html')
}
