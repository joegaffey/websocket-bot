function sendMessage(msg) {
  console.log(msg);
}

setInterval(function() {
  robot.set_distance(Math.floor(Math.random() * 100));
}, 1000);
