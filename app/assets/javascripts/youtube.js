function onYouTubePlayerReady(player_id){
    ytplayer = document.getElementById('ytplayer');
    //ytplayer.addEventListener("onStateChange", "nextSong");
    //ytplayer.addEventListener("onError", "errorFunction");
}

var vid_index = 0;
var id_arr;
var news_ids;
var news_id;

function switch_vids() {
    find_vids();
    //update_arr();
}

function load_and_play() {
    console.log("Loading video in load_and_play.");
    ytplayer.loadVideoById(news_id, 1, 'large');
    ytplayer.playVideo();    
    /*
    if( ( $('yt_button').attr('now_playing') == 'true' ) || ( $('yt_button').attr('now_playing') == 'paused' ) ){
        ytplayer.loadVideoById(news_id, 1, 'large');
        ytplayer.playVideo();    
    }
    */
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

    

    

    $('.yt_button').click(function(){
        
        update_arr();
        //get array stored in view, play or pause video
        console.log(".click yt_id: " + $('.yt_button').attr('yt_id'));
        if ($(this).attr('now_playing') == 'false'){
            //var news_ids = $(this).attr('yt_id');
            //id_arr = news_ids.split(",");
            //console.log("news_ids:" + news_ids);
            //console.log("id_arr: " + id_arr);
            //var news_id = id_arr[0];
            //console.log("news_id: " + news_id);
            
            console.log("id_arr in .click after update_arr:" + id_arr);
            console.log("news_id in .click after update_arr:" + news_id);
            ytplayer.loadVideoById(news_id, 1, 'large');
            $(this).attr('now_playing', 'true');
            /*
            $('.yt_button').each(function(){
                if (news_ids == $(this).attr('yt_id')){
                    $(this).attr('now_playing', 'true');
                }else{
                    $(this).attr('now_playing', 'false');
                }
            });
            */
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
    });
});
function loadVideo() {

        //search();
        

        var select_box = document.getElementById("country_selection");
        var country_val = select_box.options[select_box.selectedIndex].value;
        console.log(country_val);
        var vid_arr = vid_ids.split(" ");
        vid_index = 0;

        //id_arr = vid_ids.split(" ");
        //console.log(vid_ids);
        var opt_id = vid_arr[0];
        console.log(opt_id);
        ytplayer.loadVideoById(opt_id, 1, 'large');

        //document.getElementsByClassName('yt_button').yt_id = ' @vid.get_youtube_id_array("'+country_name+' music lil wayne") ';
        //console.log(document.getElementsByClassName('yt_button').yt_id);
        //var news_ids = $('.yt_button').attr('yt_id');;
        //id_arr = news_ids.split(" ");
        //console.log(id_arr);
        //news_id = id_arr[0];
        //console.log(news_id);
        //ytplayer.loadVideoById(news_id, 1, 'large');
}