processHash();

window.onhashchange = function() {
  processHash();
};

function processHash() {
  switchMode(window.location.hash.substring(1));
}

function switchMode(mode) {
  if(mode == 'sim')
    loadJS("./postmessage-robot.js");
  else if(mode == 'test')
    loadJS("./test-robot.js");
  else if(mode == 'robot')
    loadJS("./websocket-robot.js");
  console.log("Mode: " + mode);
}

function loadJS(file) {
  var script = document.createElement("script");
  script.type = "application/javascript";
  script.src = file;
  document.body.appendChild(script);
}

function messageListener() {
  if(event.data.mode) {
    switchMode(event.data.mode);
  }
}
