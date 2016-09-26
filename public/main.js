var blocklyFrame = document.getElementById("blocklyFrame").contentWindow;
var gameFrame = document.getElementById("gameFrame").contentWindow;
var controlFrame = document.getElementById("controlFrame").contentWindow;
var domain = "*";

function messageListener(event) {
  if(event.data.distance) {
    blocklyFrame.postMessage(event.data, domain);
    controlFrame.postMessage(event.data, domain);
  }
  if(event.data.action) {
    gameFrame.postMessage(event.data, domain);
    controlFrame.postMessage(event.data, domain);
  }
}

addEventListener('message', messageListener);
