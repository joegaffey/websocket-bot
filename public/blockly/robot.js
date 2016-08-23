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

var
var sensors = {};
sensors.distance = -1;

socket.on('message', function (data) {
  if(data.includes('#'))
     sensors.distance = parseInt(data.substring(0, data.indexOf('#')));
  if(sensors.distance < min_diatance)
    warn();
});




robot.left = function(time) {
  socket.emit('message', actions.left + '#' + time + ';');
  socket.on('message', function (data) {
    console.log("Received: " + data);
  });
};

robot.right = function(time) {
  socket.emit('message', actions.right + '#' + time + ';');
  socket.on('message', function (data) {
    console.log("Received: " + data);
  });
};

robot.forward = function(time) {
  socket.emit('message', actions.forward + '#' + time + ';');
  socket.on('message', function (data) {
    console.log("Received: " + data);
  });
};

robot.backward = function(time) {
  socket.emit('message', actions.backward + '#' + time + ';');
  socket.on('message', function (data) {
    console.log("Received: " + data);
  });
};

robot.ledOn = function() {
  console.log('ledOn');
  socket.emit('message', actions.ledOn + ';');
  console.log('ledOn sent');
  socket.on('message', function (data) {
    console.log("Received: " + data);
  });
};

robot.ledOff = function() {
  socket.emit('message', actions.ledOff + ';');
  socket.on('data', function (data) {
    console.log("Received: " + data);
  });
};

robot.stop = function() {
  socket.emit('message', actions.stop + ';');
  socket.on('message', function (data) {
    console.log("Received: " + data);
  });
};

robot.get_distance = function() {
  return sensors.distance;
};
