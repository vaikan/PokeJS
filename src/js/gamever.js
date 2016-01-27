function Versions() {
  this.getVersionDetails = function (id, callback) {
    var url = 'http://pokeapi.co/api/v1/game/'+id;
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
  };

  this.getAllVersionNames = function (cb) {
    var obj = {};
    var callback = function (data) {
      obj.name = data.name;
      obj.year = data.release_year;
      obj.generation = data.generation;
      cb(obj);
    };
    for (var i = 1; i <= 25; i++) {
      this.getVersionDetails(i, callback);
    }
  };
}
