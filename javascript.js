/**
 * Pomodoro Timer for the Pomodoro Technique of working/studying: https://en.wikipedia.org/wiki/Pomodoro_Technique
 *
 * Acts as a timer that alternates between a 25 minute work session, 
 * 5 minute break session, and no time free session as it waits for 
 * the user to start a new work session after a break. 
 *
 * @author Carson Wood/carsnwd, https://github.com/carsnwd
 */

/**
 * ADD STATE PATTERN FOR SESSION STUFF!!!!
 */
var session = 'f'; //Used to switch between sessions: f = no active session, b = break, w = work
$(document).ready(function(){
		document.getElementById("readyButton").addEventListener("click",function(e){
		if(session == 'f'){ //If no active session, start one.
			session = 'w'; //Session now active.
			changeSession('w');
		}
		},false);

	/**
	 * Changes the session from Break (green tomato) and Work (red tomato). 
	 * Also rotates the tomato using jQueryRotate: http://jqueryrotate.com/
	 * @param  char session: the session changing to ('f'ree -> 'w'ork -> 'b'reak -> 'f'ree)
	 * @return void
	 */
	function changeSession(session){
		if(session == 'w'){ //If the work session started, switch to red tomato
			sessionActive = true;
			$("#tomato").attr('src', 'redTomato.png').load(function(){this.width});
			$("#tomato").rotate({ angle:0,animateTo:360,easing: $.easing.easeInOutExpo })
			timer(0,2,'b');
		}else if(session == 'b'){ //If the work session has ended, switch to green tomato
			this.session = 'b';
			$("#tomato").attr('src', 'greenTomato.png').load(function(){this.width});
			$("#tomato").rotate({ angle:0,animateTo:360,easing: $.easing.easeInOutExpo }) 
			timer(0,2,'f');
		}else{
			$("#tomato").rotate({ angle:0,animateTo:360,easing: $.easing.easeInOutExpo })
			this.session = 'f';
			time.innerHTML = "Finished!";
			document.title = "Finished!";
		}
	}

	/**
	 * The timer, pass in minutes, seconds, and the next session when 
	 * this one is complete ('f'ree -> 'w'ork -> 'b'reak -> 'f'ree)
	 * @param  int minutes: starting minutes
	 * @param  int seconds: starting seconds
	 * @param  char nextSession: What session to change to after the timer expires
	 * @return void
	 */
	function timer(minutes, seconds, nextSession){
		var changeMinute = seconds;
		printTime(minutes,seconds);
		var timeInterval = setInterval(function(){
			if(changeMinute == -1){ //if x:00, change the minute and reset seconds to x:59
				changeMinute = 60;
				minutes = minutes - 1;
				seconds = 59;
			}
			if(minutes < 0){ //if the minute is < 0 then done
				changeSession(nextSession);
				clearInterval(timeInterval);
			}else{ //decrement seconds
				printTime(minutes,seconds);
				seconds = seconds - 1;
				changeMinute = changeMinute - 1;
			}
		},1000);
	}

	/**
	 * Updates the HTML with the time as it changes.
	 * @param  minutes: minutes left
	 * @param  seconds: seconds left
	 * @return void
	 */
	function printTime(minutes,seconds){
		if(seconds < 10){
			time.innerHTML = minutes + ":0" + seconds
			document.title = minutes + ":0" + seconds
		}else{
			time.innerHTML = minutes + ":" + seconds
			document.title = minutes + ":" + seconds
		}

	}
});