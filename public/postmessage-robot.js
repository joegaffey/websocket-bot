var domain = '*';

function sendMessage(msg) {
  parent.postMessage({'action': msg}, domain);
}

function messageListener(event) {
  if(event.data.distance)
    distance = event.data.distance;
}

addEventListener('message', messageListener);
