var testBot = new function() {

  this.sendMessage = function(msg) {
    console.log(msg);
  }

  setInterval(function() {
    if(this === botImpl)
      robot.set_distance(Math.floor(Math.random() * 100));
  }, 1000);
};
