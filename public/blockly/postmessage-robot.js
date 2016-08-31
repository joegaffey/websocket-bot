var actions = {};
actions.stop = 0;
actions.forward = 1;
actions.backward = 2;
actions.right = 3;
actions.left = 4;
actions.ledOn = 5;
actions.ledOff = 6;
actions.ping = 7;

var sensors = {};
sensors.distance = -1;

var domain = 'http://localhost:8585';

robot_left = function() {
  parent.postMessage(actions.left, domain);
};

robot_right = function(time) {
  parent.postMessage(actions.right, domain);
};

robot_forward = function(time) {
  parent.postMessage(actions.forward, domain);
};

robot_backward = function(time) {
  parent.postMessage(actions.backward, domain);
};

robot_ledOn = function() {
  parent.postMessage(actions.ledOn, domain);
};

robot_ledOff = function() {
  parent.postMessage(actions.ledOff, domain);
};

robot_stop = function() {
  parent.postMessage(actions.stop, domain);
};

robot_ping = function() {
  parent.postMessage(actions.ping, domain);
};

robot_get_distance = function() {
  return sensors.distance;
};
