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

var distance = 9999999;

robot_left = function() {
  sendMessage(actions.left);
};

robot_right = function() {
  sendMessage(actions.right);
};

robot_forward = function() {
  sendMessage(actions.forward);
};

robot_backward = function() {
  sendMessage(actions.backward);
};

robot_ledOn = function() {
  sendMessage(actions.ledOn);
};

robot_ledOff = function() {
  sendMessage(actions.ledOff);
};

robot_stop = function() {
  sendMessage(actions.stop);
};

robot_ping = function() {
  sendMessage(actions.ping);
};

robot_reset = function() {
  sendMessage(actions.reset);
};

robot_get_distance = function() {
  return distance;
};
