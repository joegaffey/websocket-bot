function WebsocketRobot() {
  this.socket = io();

  this.sendMessage = function(msg) {
    this.socket.emit('action', msg);
  };

  this.start = function() {
    this.socket.on('distance', function (data) {
      robot.set_distance(parseInt(data));
    });
  };

  this.stop = function() {
    this.socket.disconnect();
  };
};
