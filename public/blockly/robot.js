var robot = {};
var socket = io();

var actions = {};
actions.stop = '000#';
actions.forward = '001#';
actions.backward = '002#';
actions.right = '003#';
actions.left = '004#';
actions.ledOn = '005#';
actions.ledOff = '006#';

var min_distance = 8;
var sensors = {};
sensors.distance = -1;

socket.on('distance', function (data) {
  sensors.distance = parseInt(data);
  if(sensors.distance < min_distance)
    crash();
});

function crash() {
  socket.emit('message', actions.stop + ';');
}

robot.left = function(time) {
  socket.emit('message', actions.left + '#' + time + ';');
};

robot.right = function(time) {
  socket.emit('message', actions.right + '#' + time + ';');
};

robot.forward = function(time) {
  socket.emit('message', actions.forward + '#' + time + ';');
};

robot.backward = function(time) {
  socket.emit('message', actions.backward + '#' + time + ';');
};

robot.ledOn = function() {
  socket.emit('message', actions.ledOn + ';');
  console.log(actions.ledOn);
};

robot.ledOff = function() {
  socket.emit('message', actions.ledOff + ';');
};

robot.stop = function() {
  socket.emit('message', actions.stop + ';');
};

robot.get_distance = function() {
  return sensors.distance;
};
