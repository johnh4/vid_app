/*
function appendResults(text) {
  var results = document.getElementById('results');
  results.appendChild(document.createElement('P'));
  results.appendChild(document.createTextNode(text));
}

function makeRequest() {
  var request = gapi.client.urlshortener.url.get({
    'shortUrl': 'http://goo.gl/fbsS'
  });
  request.execute(function(response) {
    appendResults(response.longUrl);
  });
  //loadAPIClientInterfaces();
}

*/
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    //handleAPILoaded();
    console.log("ran loadAPIClientInterfaces()");
  });
}

function load() {
  gapi.client.setApiKey('AIzaSyCGMWXYkfx9jKV9xjF86WsUuxCghuODyew');
  gapi.client.load('youtube', 'v3', load_initial);

  //gapi.client.load('urlshortener', 'v1', makeRequest);
  //loadAPIClientInterfaces();
  //search();
  //loadVideo();
}