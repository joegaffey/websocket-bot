function WebsocketRobot() {
  var listening = false;
  this.socket = io();

  this.socket.on('distance', function (data) {
    if(listening)
      robot.set_distance(parseInt(data));
  });

  this.sendMessage = function(msg) {
    this.socket.emit('action', msg);
  };

  this.start = function() {
    listening = true;
  };

  this.stop = function() {
    listening = false;
  };
};
