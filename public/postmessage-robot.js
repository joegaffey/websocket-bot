var pmBot = new function() {

this.sendMessage = function(msg) {
  parent.postMessage({'action': msg}, '*');
}

function botMessageListener(event) {
  if(event.data.distance) {
    robot.set_distance(event.data.distance);
  }
}

addEventListener('message', botMessageListener);
};
