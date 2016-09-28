var wsBot = new function() {
  var socket = io();

  this.sendMessage = function(msg) {
    socket.emit('action', msg);
  }

  socket.on('distance', function (data) {
    robot.set_distance(parseInt(data));
  });
};
