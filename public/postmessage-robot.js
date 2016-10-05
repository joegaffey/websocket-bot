function PostMessageRobot() {

  this.sendMessage = function(msg) {
  };

  this.start = function() {
    addEventListener('message', botMessageListener, true);
  };

  this.stop = function() {
    removeEventListener('message', botMessageListener, true);
  };

  var botMessageListener = function(event)  {
    if(event.data.distance) {
      robot.set_distance(event.data.distance);
    }
  };
};
