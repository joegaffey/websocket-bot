var socket = io();

function sendMessage(msg) {
  socket.emit('action', msg);
}

socket.on('distance', function (data) {
  distance = parseInt(data);
});
