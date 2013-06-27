// Once the api loads call enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  console.log("ran handleAPILoaded()");
}

// Search for a given string.
function search() {
  console.log("started search()");
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });
  console.log("in search(), after request");

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(str);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
  console.log("finished search()");
}