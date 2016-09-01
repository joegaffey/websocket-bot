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

var domain = '*';

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

function sendMessage(msg) {
  parent.postMessage({'action': msg}, domain);
}

robot_get_distance = function() {
  return sensors.distance;
};

function messageListener(event) {
  if(event.data.distance)
    sensors.distance = event.data.distance;
}

addEventListener('message', messageListener);
