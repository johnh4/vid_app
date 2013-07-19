
// Search for a given string.
function search() {

  //get country to search for from selection box
  console.log("started search()");
  //var q = $('#query').val();
  var select_box = document.getElementById("country_selection");
  var q = select_box.options[select_box.selectedIndex].innerHTML + " News & Politics";
  console.log("q:" + q);
  var this_date = new Date();
  var yesterday = formatDate(this_date);
  console.log(yesterday);

  //send search request to youtube data api
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'id',
    publishedAfter: yesterday,
    maxResults: 10,
    type: "video",
    videoCategoryId: "News & Politics",
    videoDuration: "long",
    videoDefinition: "high",
    videoEmbeddable: "true"
  });
  console.log("in search(), after request");

  //process the api's response, into an array of video ids
  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(response.result);
    var res = response.result;
    $('#search-container').html('<pre>' + str + '</pre>');

    var items_arr = res['items'];
    var ids = items_arr['id'];
    console.log(items_arr);
    console.log(ids);
    v_ids = new Array();
    for(var i=0; i<items_arr.length; i++) {
      console.log(items_arr[i]);
      console.log(items_arr[i].id);
      v_ids[i] = items_arr[i].id.videoId;
      console.log(v_ids[i]);
    }
    console.log(v_ids);

    //send array to the view
    array_to_view();
  });
  console.log("finished search()");  
}

function loadVideo() {
}