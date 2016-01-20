function Versions(name, generation, year, uri) {
  this.name = name;
  this.generation = generation;
  this.year = year;
  this.uri = uri;

  getVersionDetails = function() {
    // TODO: Do something with versiondetails
  };
}

function getDetails() {
  var count = 1;
  var url = 'http://pokeapi.co/api/v1/game/'+count;
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
        console.log(parsedResponse);
        } else {
        var data = 'Could not get the result';
        console.log(data);
      }
    }
  }

}
