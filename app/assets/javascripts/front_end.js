jQuery(document).ready(function($){
    $('.toggle_active').hover(
         function(){ $(this).addClass('active') },
         function(){ $(this).removeClass('active') }
    )



function move_player() {

}

var $yt_ph = $('#ytplayer_div').height();
var $player_h = $('#youtube_player');
$('.alter_button').toggle(function() { //first click
	console.log("First click");
	//$player_h.animate( { left: "200px"}, 400);
	//$player_h.animate( { width: "200px"}, 400);
	$player_h.animate( { top: "500px"}, 400);
}, function() { //second click
	console.log("Second click");
	//$player_h.animate( { left: "0px"}, 200);
	//$player_h.animate( { width: "100%" }, 200);
	$player_h.animate( { top: "0px"}, 200);
});











});