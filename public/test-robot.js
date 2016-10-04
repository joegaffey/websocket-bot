function TestRobot() {
  this.sendMessage = function(msg) {
    console.log(msg);
  };

  this.start = function() {
    this.interval = setInterval(function() {
      robot.set_distance(Math.floor(Math.random() * 100));
    }, 1000);
  };

  this.stop = function() {
    clearInterval(this.interval);
  };
};
