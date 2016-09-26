var domain = '*';

function sendMessage(msg) {
  parent.postMessage({'action': msg}, domain);
}

function botMessageListener(event) {
  if(event.data.distance) {
    robot_set_distance(event.data.distance);
  }
}

addEventListener('message', botMessageListener);
