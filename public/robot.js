var actions = {};
actions.stop = 10;
actions.forward = 1;
actions.backward = 2;
actions.right = 3;
actions.left = 4;
actions.ledOn = 5;
actions.ledOff = 6;
actions.ping = 7;
actions.reset = 8;

robot_left = function() {
  robot_say('Bearing left');
  sendMessage(actions.left);
};

robot_right = function() {
  robot_say('Bearing right');
  sendMessage(actions.right);
};

robot_forward = function() {
  robot_say('Advancing');
  sendMessage(actions.forward);
};

robot_backward = function() {
  robot_say('Reversing');
  sendMessage(actions.backward);
};

robot_ledOn = function() {
  robot_say('LED on');
  sendMessage(actions.ledOn);
};

robot_ledOff = function() {
  robot_say('LED off');
  sendMessage(actions.ledOff);
};

robot_stop = function() {
  sendMessage(actions.stop);
};

robot_ping = function() {
  sendMessage(actions.ping);
};

robot_reset = function() {
  robot_say('Rebooting');
  sendMessage(actions.reset);
};

var distance = 999;
var lastDistance = distance;
robot_get_distance = function() {
  if(lastDistance != distance) {
    if(distance === -1)
      robot_say('The algorithm is flawed. The mission has failed.');
    else if(distance === -2)
      robot_say('The algorithim is satisfactory. I have reached my destination. Thank you.');
  }
  lastDistance = distance;
  return distance;
};

var lastText = null;
function robot_say(text) {
  if(lastText !== text) {
    var speech = new SpeechSynthesisUtterance(text)
    speech.pitch = 0.1;
    speech.rate = 1.3;
    window.speechSynthesis.speak(speech);
  }
  lastText = text;
}
