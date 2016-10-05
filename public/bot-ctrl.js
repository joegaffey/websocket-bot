(function(){
  var AUDIO_VOLUME = 0.01;
  var REFRESH_DELAY = 100;
  var BEEP_DELAY = 1000;

  var GAME_TIME = 60000;
  var WARNING_TIME = GAME_TIME / 3;
  var DANGER_TIME = GAME_TIME / 6;

  var audio_vol = AUDIO_VOLUME;
  var timerStopped = true;
  var startTime;
  var colors = ['red','orange','green','green','green'];

  var distanceValEl = document.getElementById('distanceVal');
  distanceValEl.textContent = robot.get_distance();
  var beepButtonEl = document.getElementById('beepButton');
  var resetButtonEl = document.getElementById('resetButton');
  var timeEl = document.getElementById('time');
  setTimeDisplay(GAME_TIME);
  var eqCells = [...document.querySelectorAll('table#eqTable td')];

  function ctrlMessageListener(event) {
    if(event.data.action && timerStopped) {
      console.log(event.data.action);
      if(![robot.actions.stop,  robot.actions.reset].includes(event.data.action)) {
        startTimer();
      }
    }
  }

  addEventListener('message', ctrlMessageListener);

  beepButtonEl.onclick = toggle_beep;
  resetButtonEl.onclick = reset;

  document.addEventListener('visibilitychange', function(){
    if (document.hidden) {
      audio_vol = 0;
    }
    else {
      audio_vol = AUDIO_VOLUME;
    }
  },false);

  function startTimer() {
    startTime = new Date().getTime();
    timerStopped = false;
    turnBeepOn();
  }

  function getTimeString(time) {
     return pad(Math.floor(time / 60000)) + ':' +
                pad(Math.floor((time % 60000) / 1000)) + ':' +
                pad(Math.floor((time % 1000) / 10));
  }

  function setTimeDisplay(time) {
    if(time < DANGER_TIME)
      timeEl.style.color = 'red';
    else if(time < WARNING_TIME)
      timeEl.style.color = 'orange';
    else 
      timeEl.style.color = 'green';
    timeEl.innerHTML = getTimeString(time);
  }

  function pad(num) {
    var str = num + '';
    var pad = '00';
    return pad.substring(0, pad.length - str.length) + str;
  }

  function reset() {
  	parent.postMessage({'program': 'halt'}, '*');
    robot.reset();
    turnBeepOff();
    setTimeDisplay(GAME_TIME);
    distanceValEl.textContent = robot.get_distance();
    timerStopped = true;
    crashed = false;
  }

  var ctx = new (window.AudioContext || window.webkitAudioContext)();
  var o = ctx.createOscillator();
  o.type = 'square';

  var g = ctx.createGain();
  g.gain.value = 0;
  o.connect(g);
  g.connect(ctx.destination);
  o.start(0);

  var beepOn = false;
  function toggle_beep() {
    if(beepOn)
      turnBeepOff();
    else
      turnBeepOn();
  }

  function turnBeepOff() {
    beepOn = false;
    beepButtonEl.innerHTML = 'Beep On';
  }

  function turnBeepOn() {
    beepOn = true;
    beepButtonEl.innerHTML = 'Beep Off';
  }

  function handleCrash() {
    timerStopped = true;
    crashed = true;
    if(beepOn)
      turnBeepOff();
  }

  function handleTimeOver() {
    parent.postMessage({'program': 'halt'}, '*');
    timerStopped = true;
    setTimeDisplay(0);
    if(beepOn)
      turnBeepOff();
    robot.fail();
    parent.postMessage({'mission': 'FAILED'}, '*');
  }

  var crashed = false;
  var step = 4;
  setInterval(function() {
    if(crashed || timerStopped)
      return;
    var distance = robot.get_distance();
    if(distance < 0) {
      handleCrash();
      return;
    }
    else 
      distanceValEl.textContent = distance;

    step = Math.floor(distance / 20);
    if(step > 4)
      step = 4;
    setColor(step);

    var delta = GAME_TIME - (new Date().getTime() - startTime);
    if(delta < 0) {
      handleTimeOver();
      return;
    }
    setTimeDisplay(delta);

  }, REFRESH_DELAY);

  var beepSpeed = 1;
  function beepInterval() {
    beepSpeed = BEEP_DELAY / (5 - step);
    setTimeout(function(){ 
      if(beepOn) 
        beep(step);
      beepInterval();
    }, beepSpeed);
  }
  beepInterval();

  function setColor(step) {
    var color = colors[step];
    distanceValEl.style.color = color;
    eqCells.forEach(function(cell, index) {
      cell.style.borderColor = color;
      if(index == step)
        cell.style.backgroundColor = color
      else
        cell.style.backgroundColor = 'white';
    });
  }

  function beep(step) {
    o.frequency.value = ((5 - step) * (5 - step) * 50);
    g.gain.value = audio_vol * (5 - step) * 0.2;
    setTimeout(function(){ g.gain.value = 0; }, 100);
  }

})();
