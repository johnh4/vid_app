var v_ids = new Array();

// Once the api loads call enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  search();
  console.log("ran handleAPILoaded()");
}

// Search for a given string.
function search() {

  loadVideo();

  console.log("started search()");
  //var q = $('#query').val();
  var select_box = document.getElementById("country_selection");
  var q = select_box.options[select_box.selectedIndex].innerHTML + " News & Politics";
  console.log("q:" + q);
  var this_date = new Date();
  var yesterday = formatDate(this_date);
  console.log(yesterday);

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

    function array_to_view() {
      $(".yt_button").attr("yt_id", v_ids);
      console.log(v_ids);
      console.log($(".yt_button").attr("yt_id"));
      console.log(v_ids);
    }
    array_to_view();
  });
  console.log("finished search()");  
}



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