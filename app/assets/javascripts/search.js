var v_ids = new Array();
var v_array = new Array();

// Once the api loads call enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  //search();
  console.log("ran handleAPILoaded()");
}

function find_vids() {
  var q = get_query();
  var term = "News & Politics";
  q = q + " " + term;
  console.log("q: " + q);
  var req = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  resp_to_arr(req);
  console.log("v_array: " + v_array);
  //array_to_view();
}

function resp_to_arr(req) {
  console.log("v_array at beginning of resp_to_arr: " + v_array);
  req.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(response.result);
    var res = response.result;
    $('#search-container').html('<pre>' + str + '</pre>');

    var items_arr = res['items'];
    var ids = items_arr['id'];
    console.log("items_arr: " + items_arr);
    console.log("ids: " + ids);
    var idsres = res.items[0].id;
    console.log("idsres: " + idsres);
    v_ids = new Array();
    for(var i=0; i<items_arr.length; i++) {
      //console.log(items_arr[i]);
      //console.log(items_arr[i].id);
      v_ids[i] = items_arr[i].id.videoId;
      //console.log(v_ids[i]);
    }
    console.log("v_ids: " + v_ids);
    v_array = v_ids;
    console.log("v_array at end of resp_to_arr: " + v_array);
    //return v_ids;
    array_to_view();
  });
}

function array_to_view() {
  console.log("yt_button's yt_id attr before: " + $(".yt_button").attr("yt_id"));
  console.log("Putting array into view.");
  $(".yt_button").attr("yt_id", v_array);
  console.log("v_array from array_to_view: " + v_array);
  console.log("yt_id attr after, in array_to_view: " + $(".yt_button").attr("yt_id"));
  update_arr();
  load_and_play();
}

function get_query() {
  var select_box = document.getElementById("country_selection");
  var country_val = select_box.options[select_box.selectedIndex].value;
  console.log(country_val);
  vid_index = 0;
  var nation = country_val;

  //plays video if the array is already populated
  /*
  if(v_array[0]) {
    console.log("v_array[0]: " + v_array[0]);
    ytplayer.loadVideoById(v_array[0], 1, 'large');
    ytplayer.playVideo();
  }
  */
  return nation;
}
// Search for a given string.
function search() {

  loadVideo();

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


/*************TIME FUNCTIONS *************************/
function getGMTOffset(localDate) {
    var positive = (localDate.getTimezoneOffset() > 0);
    var aoff = Math.abs(localDate.getTimezoneOffset());
    var hours = Math.floor(aoff / 60);
    var mins = aoff % 60;
    var offsetTz = padzero(hours) + ':' + padzero(mins);
    // getTimezoneOffset() method returns difference between (GMT) and local time, in minutes.
    // example, If your time zone is GMT+2, -120 will be returned.
    // This is why we are inverting sign
    if (!positive) {
      return '+' + offsetTz;
    }
    return '-' + offsetTz;
}

function pad2zeros(n) {
  if (n < 100) {
      n = '0' + n;
  }
  if (n < 10) {
      n = '0' + n;
  }
  return n;
}
function padzero(n) {
    return n < 10 ? '0' + n : n.toString();
}

function formatDate(date)  {
  if (date) {
    return (date.getFullYear()) +
           '-' + padzero((date.getMonth() + 1)) +
           '-' + padzero(date.getDate()-1) +
           'T' + padzero(date.getHours()) +
           ':' + padzero(date.getMinutes()) +
           ':' + padzero(date.getSeconds()) +
           '.' + pad2zeros(date.getMilliseconds()) +
           getGMTOffset(date);
  }
  return '';
}
/******************************************************/