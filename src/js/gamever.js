function Versions() {
  this.getVersionDetails = function (id, callback) {
    var url = 'http://pokeapi.co/api/v1/game/'+id;
    var parsedResponse;
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = getVersion;
    httpRequest.open('GET', url);
    httpRequest.send();

    function getVersion() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          var response = httpRequest.response;
          parsedResponse  = JSON.parse(response);
          callback(parsedResponse);
          } else {
          var data = 'Could not get the result';
          console.log(data);
        }
      }
    }
  };

  this.getAllVersionNames = function () {
    var callbackFunction = function (parsedResponse) {
      var obj = {
        name: parsedResponse.name,
        year: parsedResponse.release_year,
        uri: parsedResponse.resource_uri
      };

      console.log(obj);
    };
    for (var i = 1; i <= 25; i++) {
      this.getVersionDetails(i, callbackFunction);
    }

  };
}

var gamever = new Versions();
gamever.getAllVersionNames();
