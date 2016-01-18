function getPokeId(id, callback) {
  var data;
  url = 'http://pokeapi.co/api/v1/pokemon/' + id;
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function displayResults() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        data = httpRequest.responseText;
        callback(data);
      } else {
        data = 'Could not get the result';
        callback(data);
      }
    }
  };
  httpRequest.open('GET', url);
  httpRequest.send();
}
