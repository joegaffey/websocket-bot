var actions = {};
actions.stop = 'STOP';
actions.forward = 'FWD';
actions.backward = 'BACK';
actions.right = 'RIGHT';
actions.left = 'LEFT';
actions.ledOn = 'LEDON';
actions.ledOff = '`LEDOFF`';
actions.ping = 'PING';
actions.reset = 'RESET';

var CRASH = -1;
var FINISH = -2;

var CRASH_SPEECH = 'The mission has failed. The algorithm is flawed.';
var FINISH_SPEECH = 'I have reached my destination. The algorithim is satisfactory. Thank you.';

robot_left = function() {
  robot_say('Bearing left');
  safeSend(actions.left);
};

robot_right = function() {
  robot_say('Bearing right');
  safeSend(actions.right);
};

robot_forward = function() {
  robot_say('Advancing');
  safeSend(actions.forward);
};

robot_backward = function() {
  robot_say('Reversing');
  safeSend(actions.backward);
};

robot_ledOn = function() {
  robot_say('LED on');
  safeSend(actions.ledOn);
};

robot_ledOff = function() {
  robot_say('LED off');
  safeSend(actions.ledOff);
};

robot_stop = function() {
  safeSend(actions.stop);
};

robot_ping = function() {
  robot_say('Ping');
  safeSend(actions.ping);
};

robot_reset = function() {
  robot_say('Rebooting');
  safeSend(actions.reset);
};

var lastMessage = null;
function safeSend(message) {
  if(message !== lastMessage)
    sendMessage(message);
  lastMessage = message;
}

robot_get_distance = function() {
  return distance;
};

var distance = 999;
robot_set_distance = function(newDistance) {
  if(distance !== newDistance) {
    distance = newDistance;
    if(distance === CRASH)
      handleCrash();
    else if(distance === FINISH)
      handleFinish();
  }
}

function handleCrash() {
  console.log('Crashed');
  if(frame_id === 'ctrl')  // dirty hack
    robot_say(CRASH_SPEECH);
}

function handleFinish() {
  console.log('Finished');
  if(frame_id === 'ctrl') // dirty hack
    robot_say(FINISH_SPEECH);
}

var lastText = null;
function robot_say(text) {
  if(lastText !== text) {
    lastText = text;
    window.speechSynthesis.cancel();
    var speech = new SpeechSynthesisUtterance(text)
    speech.pitch = 0.1;
    speech.rate = 1.3;
    window.speechSynthesis.speak(speech);
  }
}
