var v_ids = new Array();
var v_array = new Array();
var titles = new Array(),
    descriptions = new Array();

// Once the api loads call enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  console.log("ran handleAPILoaded()");
}

function find_vids() {
  //change_continent();
  var q = get_query();
  var term = "News & Politics";
  q = q + " " + term;
  console.log("q: " + q);
  var this_date = new Date();
  var yesterday = formatDate(this_date);
  console.log("yesterday: " + yesterday);

  var req = gapi.client.youtube.search.list({
    q: q,
    //publishedAfter: yesterday,
    //videoCategoryId: "News & Politics",
    part: 'snippet'
    //videoDefinition: "high"
    //videoEmbeddable: "true"
  });

  resp_to_arr(req);
  console.log("v_array: " + v_array);
  //array_to_view();
}

function resp_to_arr(req) {
  console.log("v_array at beginning of resp_to_arr: " + v_array);
  req.execute(function(response) {
    //var real = response.result;
    var str = JSON.stringify(response.result);
    console.log(response.result);
    var res = response.result;
    $('#search-container').html('<pre>' + str + '</pre>');
    //$('#search-container').html('<pre>' + response.result + '</pre>');
    //console.log("real: " + real);

    var items_arr = res['items'];
    var ids = items_arr['id'];
    //var title = items_arr['snippet'].title;
    console.log("items_arr: " + items_arr);
    console.log("ids: " + ids);
    var idsres = res.items[0].id;
    console.log("idsres: " + idsres);
    v_ids = new Array();
    titles = new Array();
    descriptions = new Array();
    //get video id, title, and description from the response.
    for(var i=0; i<items_arr.length; i++) {
      v_ids[i] = items_arr[i].id.videoId;
      titles[i] = items_arr[i].snippet.title;
      descriptions[i] = items_arr[i].snippet.description;
    }
    console.log("titles: " + titles);
    console.log("v_ids: " + v_ids);
    console.log("descriptions: " + descriptions);
    v_array = v_ids;
    console.log("v_array at end of resp_to_arr: " + v_array);
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

  return nation;
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