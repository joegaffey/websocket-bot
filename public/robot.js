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

var distance = 9999;

robot_left = function() {
  robot_say('Turning left');
  sendMessage(actions.left);
};

robot_right = function() {
  robot_say('Turning right');
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

robot_get_distance = function() {
  return distance;
};

function robot_say(text) {
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}
