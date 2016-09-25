var domain = '*';

function sendMessage(msg) {
  parent.postMessage({'action': msg}, domain);
}

function messageListener(event) {
  if(event.data.distance) {
    robot_set_distance(event.data.distance);
  }
}

addEventListener('message', messageListener);
