var socket = io();

function sendMessage(msg) {
  socket.emit('action', msg);
}

socket.on('distance', function (data) {
  robot_set_distance(parseInt(data));
});
