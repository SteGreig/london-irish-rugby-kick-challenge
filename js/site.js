
document.querySelector('.game-bounds').style.width = window.innerWidth+"px";
document.querySelector('.stadium-scene-img').style.width = window.innerWidth+"px";

$(window).resize(function() {
	document.querySelector('.game-bounds').style.width = window.innerWidth+"px";
	document.querySelector('.stadium-scene-img').style.width = window.innerWidth+"px";
});

jQuery(document).ready(function($) {

	$('.just-play').click(function() {
		$('.intro-screen').removeClass('active');
	});


	$('.pick-player').click(function() {
		$('.intro-screen').removeClass('active');
		$('.player-select').addClass('active');
	});

	$('.player-grid li').click(function() {
		$('.player-grid li').removeClass('active');
		$(this).addClass('active');
	});

	$('.player-selected-play').click(function() {
		$('.player-select').removeClass('active');
	});

	$('.player-topsy button').click(function() {
		$('.player-standing').attr('src','images/player-standing-topsy.png');
		$('.player-kicking-left').attr('src','images/player-kicking-left-topsy.png');
		$('.player-kicking-right').attr('src','images/player-kicking-right-topsy.png');
	});
	$('.player-saia button').click(function() {
		$('.player-standing').attr('src','images/player-standing-saia.png');
		$('.player-kicking-left').attr('src','images/player-kicking-left-saia.png');
		$('.player-kicking-right').attr('src','images/player-kicking-right-saia.png');
	});
	$('.player-white-brown-hair button').click(function() {
		$('.player-standing').attr('src','images/player-standing-white-brown-hair.png');
		$('.player-kicking-left').attr('src','images/player-kicking-left-white-brown-hair.png');
		$('.player-kicking-right').attr('src','images/player-kicking-right-white-brown-hair.png');
	});
	$('.player-white-blonde-hair button').click(function() {
		$('.player-standing').attr('src','images/player-standing-white-blonde-hair.png');
		$('.player-kicking-left').attr('src','images/player-kicking-left-white-blonde-hair.png');
		$('.player-kicking-right').attr('src','images/player-kicking-right-white-blonde-hair.png');
	});


	$('.kick-btn').click(function() {
		var cursorPos = $('.direction-cursor').position();
		cursorPos = Math.round(cursorPos.left);

		var directionBoxWidth = $('.direction-box').width();
		var cursorWidth = $('.direction-cursor').width();
		cursorPos = Math.round((cursorPos / (directionBoxWidth - cursorWidth)) * 100);

		$('.score span span').removeClass('change');

		$('.direction-cursor').addClass('paused');

		$('.attempts li:first-child').remove();

		$('.player-standing').hide();

		if(cursorPos <= 48) {
			$('.player-kicking-left').show();
		} else {
			$('.player-kicking-right').show();
		}

		$('.ball').css('left',cursorPos+"%");

		$('.ball').addClass('kicked');

		if($('.score').attr('data-score')) {
			var score = parseInt($('.score').attr('data-score'));
		} else {
			$('.score').attr('data-score','0');
			var score = 0;
		}

		if(cursorPos >= 31 && cursorPos <= 37 || cursorPos >= 63 && cursorPos <= 69) {
			$('.ball').addClass('successful-kick');
			$('.score').attr('data-score',score+5);
			score = score + 5;

			$('.game-screen-wrap').addClass('successful-kick-5');

			setTimeout(
			function() {
				$('.score span span').addClass('change');
				$('.score-type').show().html('Blue skip! <strong>5 pts!</strong>');
			}, 1200);

		} else if(cursorPos >= 48 && cursorPos <= 52) {
			$('.ball').addClass('kicked-middle-success');
			$('.score').attr('data-score',score+10);
			score = score + 10;

			$('.game-screen-wrap').addClass('successful-kick-10');

			setTimeout(
			function() {
				$('.score span span').addClass('change');
				$('.score-type').show().html('GOLDEN SKIP! <strong>10 pts!</strong>');
			}, 1200);

		} else if(cursorPos == 46 || cursorPos == 47 || cursorPos == 53 || cursorPos == 54) {
			$('.ball').addClass('kicked-middle-success');
			$('.score').attr('data-score',score+2);
			score = score + 2;

			$('.game-screen-wrap').addClass('successful-kick-2');

			setTimeout(
			function() {
				$('.score span span').addClass('change');
				$('.score-type').show().html('Nearly! <strong>2 pts!</strong>');
			}, 1200);

		} else {
			score = score + 0;

			$('.game-screen-wrap').addClass('missed-kick');

			setTimeout(
			function() {
				$('.score-type').show().text('oops!');
			}, 1200);
		}

		$('.final-score').text(score);

		setTimeout(
		function() {
			$('.score span span').text(score);
			if(score >= 100) {
				$('.score').css('color','gold');
			}
		}, 1600);

		setTimeout(
		function() {
			$('.next-kick-btn').removeAttr('disabled');
		}, 1200);


		if(cursorPos <= 25) {
			$('.ball').addClass('kicked-far-left');
		} else if(cursorPos > 25 && cursorPos <= 40) {
			$('.ball').addClass('kicked-left');
		} else if(cursorPos > 40 && cursorPos <= 60) {
			$('.ball').addClass('kicked-middle');
		} else if(cursorPos > 60 && cursorPos <= 75) {
			$('.ball').addClass('kicked-right');
		} else if(cursorPos > 75) {
			$('.ball').addClass('kicked-far-right');
		}

		$(this).hide();
		$('.next-kick-btn').show();
		$('.next-kick-btn').attr('disabled','disabled');

		if($('.attempts li').length < 1) {
			$('.next-kick-btn').hide();
			$('.kick-btn').show();
			$('.kick-btn,.next-kick-btn').attr('disabled','disabled');
			setTimeout(
			function() {
				$('.score-overlay').addClass('active');
			}, 2000);

			$('.tweet').attr('href',"http://twitter.com/intent/tweet?text=I+scored+"+score+"+points+on+@LiRFC+Rugby+Kick+Challenge!+Reckon+you+can+beat+it?+Play+here+-&url=https://www.powerday.co.uk/rugby-kick-challenge&hashtags=LondonIrishKickChallenge");
			$('.fb').attr('href',"http://www.facebook.com/sharer/sharer.php?u=https://www.powerday.co.uk/rugby-kick-challenge/&title=I+scored+"+score+"+points+on+London+Irish's+Rugby+Kick+Challenge!+Reckon+you+can+beat+it?");

		}

		$('.game-screen-wrap').removeClass('ins-active');
	});


	$('.next-kick-btn,.restart-game, .restart-icon').click(function() {
		$('.next-kick-btn').hide();
		$('.kick-btn').show();

		$('.game-screen-wrap').removeClass('ins-active');

		$('.player-standing').show();
		$('.player-kicking').hide();

		$('.ball').removeClass('kicked-left').removeClass('kicked-right').removeClass('kicked-middle').removeClass('kicked-middle-success').removeClass('kicked-far-right').removeClass('kicked-far-left').removeClass('kicked').removeClass('successful-kick');
		$('.ball').css('left','50%');

		$('.direction-cursor').removeClass('paused');

		$('.score-type').hide();

		$('.game-screen-wrap').removeClass('missed-kick').removeClass('successful-kick-2').removeClass('successful-kick-5').removeClass('successful-kick-10');

	});


	$('.score-overlay .close').click(function() {
		$('.score-overlay').removeClass('active');
	});


	$('.ins-icon').click(function() {
		$('.game-screen-wrap').addClass('ins-active');
	});
	$('.ins-close').click(function() {
		$('.game-screen-wrap').removeClass('ins-active');
	});

	$('.restart-game,.restart-icon').click(function() {
		$('.score-overlay').removeClass('active');
		$('.score').attr('data-score',0);
		$('.score span span').text('0');
		$('.final-score').text('0');
		setTimeout(
		function() {
			$('.score span span').text('0');
			$('.score-type').hide();
		}, 1600);
		$('.kick-btn,.next-kick-btn').removeAttr('disabled');
		$('.player-standing').show();
		$('.player-kicking').hide();
		$('.score').css('color','#fff');

		var attemptsLeft = $('.attempts li').length;
		var attemptsToAdd = 10 - attemptsLeft;
		for(i = 0; i < attemptsToAdd; i++) {
			$(".attempts").append("<li><img src='images/ball.png' alt='Rugby ball'></li>")
		}
	});



	// ------------------------------------------------------------------------
	// Make Facebook/Twitter buttons open in popup window
	// ------------------------------------------------------------------------
	$('.fb, .tweet').click(function (event) {
	    if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
	    window.open($(this).attr("href"), "popupWindow", "width=600,height=600,scrollbars=yes");
	});


});

