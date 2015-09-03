//initial start screen
var resetTimer = true;

function startGame(){
	document.getElementById('start').style.display = 'none';
	document.getElementById('screen-overlay').style.display = 'none';
	begin = true;
	resetTimer = false;
	countdown();
}

//begin new game if player chooses to
function beginNewGame(){
	document.getElementById('start').style.display = 'block';
	document.getElementById('screen-overlay').style.display = 'block';
	ctx.clearRect(0, -50, 750, 750);
	player.reset();
	lives = 3;
	begin = true;
	resetTimer = true;
	gemsObtained = 0;
}

//show if player chooses to quit game.
//reset function called after image of gravestone is shown. distinct from reset function alone.
function quitGame(){
    popup('quitPopUp');
    player.x = 405;
    player.y = 455;
    player.sprite = 'images/grave.png'; //reset function follows image display.
    setTimeout(function(){ popup('quitPopUp'); player.reset(); beginNewGame();}, 5000);
}

//controls timer
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        	if(resetTimer){
        		clearInterval(settings);
        	}
	        diff = duration - (((Date.now() - start) / 1000) | 0);

	        // does the same job as parseInt truncates the float
	        minutes = (diff / 60) | 0;
	        seconds = (diff % 60) | 0;

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        display.textContent = minutes + ":" + seconds;
	        // if(seconds == 10 || seconds == 25){
	        // 	popup('popUpDiv');
	        // }
	        if(minutes == 0 && seconds == 0){
	        	display.textContent = "Time is up";
	        	clearInterval(settings);
	        	player.timesUp();
	        }
	        if (diff <= 0) {
	            // add one second so that the count down starts at the full duration
	            // example 05:00 not 04:59
	            start = Date.now() + 1000;
	        }
	};
	timer();
	var settings = setInterval(timer, 1000);
	}

function countdown() {
		var timeMinutes = 60 * 3,
    	display = document.querySelector('#time');
		startTimer(timeMinutes, display);
};

//governs action of gatekeeper enemy, and its response to user's input
function responseToAnswer(){
    var reply = document.getElementById('answer').value;
    var answer = 1;
		player.y = 60;
        player.x = 650;
	    if(reply == answer){
        popup('riddle');
        popup('proceed');
        begin = true;
        setTimeout(function(){popup('proceed');
            if(gemsObtained >= 3){
                player.win();
            } else {
                player.x = 405;
                player.y = 425;
                popup('need-gems');
                setTimeout(function(){popup('need-gems')}, 6000);
            }
    	}, 4000);
    } else {
        popup('riddle');
        popup('stung');
        begin = true;
        setTimeout(function(){popup('stung'); player.dead()}, 7000);
    }
}