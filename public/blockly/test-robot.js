var robot = {};

robot.left = function(time) {
  alert("left " + time);
};

robot.right = function(time) {
  alert("right " + time);
};

robot.forward = function(time) {
  alert("forward " + time);
};

robot.backward = function(time) {
  alert("backward " + time);
};

robot.stop = function(time) {
  alert('stop');
};

robot.ledOn = function(time) {
  alert('LED on');
};

robot.ledOff = function(time) {
  alert('LED off');
};

robot.blink = function(time) {
  alert("blink " + time);
};

robot.get_distance = function() {
  return Math.random() * 100;
};
