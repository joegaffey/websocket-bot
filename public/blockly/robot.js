var socket = io();

var actions = {};
actions.stop = 0;
actions.forward = 1;
actions.backward = 1;
actions.right = 3;
actions.left = 4;
actions.ledOn = 5;
actions.ledOff = 6;
actions.ping = 7;

var sensors = {};
sensors.distance = -1;

socket.on('distance', function (data) {
  sensors.distance = parseInt(data);
});

robot_left = function() {
  socket.emit('action', actions.left);
};

robot_right = function(time) {
  socket.emit('action', actions.right);
};

robot_forward = function(time) {
  socket.emit('action', actions.forward);
};

robot_backward = function(time) {
  socket.emit('action', actions.backward);
};

robot_ledOn = function() {
  socket.emit('action', actions.ledOn);
};

robot_ledOff = function() {
  socket.emit('action', actions.ledOff);
};

robot_stop = function() {
  socket.emit('action', actions.stop);
};

robot_ping = function() {
  socket.emit('action', actions.ping);
};

robot_get_distance = function() {
  return sensors.distance;
};
