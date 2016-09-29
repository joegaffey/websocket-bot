var AUDIO_VOLUME = 0.02;
var REFRESH_DELAY = 1000;

var GAME_TIME = 600000;
var WARNING_TIME = 120000;
var DANGER_TIME = 60000;

var audio_vol = AUDIO_VOLUME;
var timerStopped = true;
var startTime;
var colors = ['red','orange','green','green','green'];

var distanceValEl = document.getElementById('distanceVal');
var beepButtonEl = document.getElementById('beepButton');
var timeEl = document.getElementById('time');
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

document.addEventListener('visibilitychange', function(){
  if (document.hidden) {
    audio_vol = 0;
  }
  else {
    audio_vol = AUDIO_VOLUME;
  }
},false);

function startTimer() {
  timerStopped = false;
  turnBeepOn();
  startTime = new Date().getTime();
  setInterval(function() {
    var delta = GAME_TIME - (new Date().getTime() - startTime);
    if(timerStopped || delta < 0)
      return;
    if(delta < WARNING_TIME)
      time.style.color = 'orange';
    if(delta < DANGER_TIME)
      time.style.color = 'red';
    time.innerHTML =  pad(Math.floor(delta / 60000)) + ':' +
                      pad(Math.floor((delta % 60000) / 1000)) + ':' +
                      pad(Math.floor((delta % 1000) / 10));
  }, 250);
}

function pad(num) {
  var str = num + '';
  var pad = '00';
  return pad.substring(0, pad.length - str.length) + str;
}

function reset() {
  timerStopped = true;
  robot.reset();
  turnBeepOff();
  time.innerHTML = "00:00:00";
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

setInterval(function() {
  var distance = robot.get_distance();
  if(distance < 0)
    timerStopped = true;
  distanceValEl.textContent = distance;
  var step = Math.floor(distance / 20);
  if(step > 4)
    step = 4;
  setColor(step);
  if(distance > 1 && beepOn)
    beep(step);
}, REFRESH_DELAY);

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
  o.frequency.value = ((5 - step) * (5 - step) * 100);
  g.gain.value = audio_vol * (5 - step);
  setTimeout(function(){ g.gain.value = 0; }, 100);
}
