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
actions.distance = '007#';
actions.blink = '008#';

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
  socket.emit('message', actions.distance + ';');
  socket.on('message', function (data) {
    console.log("Received: " + data);
    //TBD - how to get the data back to Blockly?
  });
};
