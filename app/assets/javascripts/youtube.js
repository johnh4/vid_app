function onYouTubePlayerReady(player_id){
    ytplayer = document.getElementById('ytplayer');
    //ytplayer.addEventListener("onStateChange", "nextSong");
    //ytplayer.addEventListener("onError", "errorFunction");
}

var vid_index = 0;
var id_arr;
var news_ids;
var news_id;
var vid_title,
    vid_description;

function switch_vids() {
    find_vids();
}

//jQuery(document).ready(function($){
    function set_title_and_desc() {
        //vid_title = getElementById('title_el');
        //vid_description = getElementById('description_el');
        //vid_title.innerHTML = titles[vid_index];
        //vid_description.innerHTML = descriptions[vid_index];
    
        $('#title_el').html('<h4>' + titles[vid_index] + '</h4>');
        $('#description_el').html('<p>' + descriptions[vid_index] + '</p>');
    }
//});
function load_and_play() {
    console.log("Loading video in load_and_play.");
    ytplayer.loadVideoById(news_id, 1, 'large');
    ytplayer.playVideo();
    $('.yt_button').attr('now_playing', 'true');
    set_title_and_desc();
}

function update_arr() {
    var news_ids = $('.yt_button').attr('yt_id');
    console.log("yt_id in update_arr: " + $('.yt_button').attr('yt_id'));
    id_arr = news_ids.split(",");
    console.log("news_ids in update_arr:" + news_ids);
    console.log("id_arr in update_arr: " + id_arr);
    news_id = id_arr[0];
    console.log("news_id in update_arr: " + news_id);
}

$(document).on('ajax:complete ready', function(){

    var params = { allowScriptAccess: "always" };
    var atts = {id: "ytplayer"};
    var width = document.body.clientWidth;
    swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=ytplayer",
                        "ytplayer_div", width, "500", "9", null, null, params, atts);
 
    $('.load_button').click(function(){ 
        find_vids();
        load_and_play();
    });

    $('.yt_button').click(function(){
        
        update_arr();
        //get array stored in view, play or pause video
        console.log(".click yt_id: " + $('.yt_button').attr('yt_id'));
        if ($(this).attr('now_playing') == 'false'){            
            console.log("id_arr in .click after update_arr:" + id_arr);
            console.log("news_id in .click after update_arr:" + news_id);
            ytplayer.loadVideoById(news_id, 1, 'large');
            $(this).attr('now_playing', 'true');
        }else if ($(this).attr('now_playing') == 'true'){
            ytplayer.pauseVideo();
            $(this).attr('now_playing', 'paused');
        }else if ($(this).attr('now_playing') == 'paused'){
            ytplayer.playVideo();
            $(this).attr('now_playing', 'true');
            console.log(".click yt_id in playVideo(): " + $('.yt_button').attr('yt_id'));
            console.log("id_arr in playVideo(): " + id_arr);
        };
    });
    
    //play the next video
    $('.next_button').click(function(){
        if( (vid_index) < (id_arr.length-1) ) {
            vid_index++;
            news_id = id_arr[vid_index];
            ytplayer.loadVideoById(news_id, 1, 'large');
            console.log("news_id after .next_button: " + news_id);
        }
        else if (vid_index == (id_arr.length-1) ) {
            vid_index = 0;
            news_id = id_arr[vid_index];
            ytplayer.loadVideoById(news_id, 1, 'large');
            console.log(news_id);
        }
    set_title_and_desc();
    });

    //play the previous video
    $('.prev_button').click(function(){
        if( (vid_index) > 0 ) {
            vid_index--;
            news_id = id_arr[vid_index];
            ytplayer.loadVideoById(news_id, 1, 'large');
            console.log(news_id);
        }
        else if (vid_index == 0 ) {
            vid_index = id_arr.length - 1;
            news_id = id_arr[vid_index];
            ytplayer.loadVideoById(news_id, 1, 'large');
            console.log(news_id);
        }
    set_title_and_desc();
    });
});

function change_continent() {
    var country_box = document.getElementById("country_selection");
    remove_nodes(country_box);
    sel_country();
    //selectItemByValue(test_box, "United States");
}
function load_initial() {
    change_continent();
    find_vids();
}
function sel_country() {
    var select_box = document.getElementById("continent_selection");
    var cont_str = select_box.options[select_box.selectedIndex].value;
    var country_box = document.getElementById("country_selection");
    var cont = document.getElementById("cont_box");
    var conts;
    //fills box with the continent's countries
    var cont_array = cont_str.substr(1,cont_str.length-2).split('"').join("").split(",");
    for (i=0; i< cont_array.length; i++) {
        var opt;        
        if(cont_array[i]==" United States") {
            opt = new Option(cont_array[i],cont_array[i], true, true);
        }
        else {
            opt = new Option(cont_array[i],cont_array[i]);
        }
        country_box.appendChild(opt);
    }
    document.getElementById('search-container').innerHTML = cont_array;
    //selectItemByValue(test_box,"United States");
}

function remove_nodes(el) {
    while (el.hasChildNodes() ) {
        el.removeChild(el.lastChild);
    }
}

function selectItemByValue(elmnt, value){
    for(var i=0; i < elmnt.options.length; i++) {
      if(elmnt.options[i].value == value) {
        elmnt.selectedIndex = i;
        console.log("selected index triggered by US.");
      }
    }
}