processHash();

window.onhashchange = function() {
  processHash();
};

function processHash() {
  var mode = window.location.hash.substring(1);
  if(mode == '') {
    mode = 'robot';
    window.location.hash = '#' + mode;
  }
  switchMode(mode);
}

function switchMode(mode) {
  if(mode === 'sim')
    botImpl = pmBot;
  else if(mode === 'test')
    botImpl = testBot;
  else if(mode === 'robot')
    botImpl = wsBot;
  console.log("Mode: " + mode);
  parent.postMessage({'mode': mode}, '*');
}

// function switchMode(mode) {
//   if(mode === 'sim')
//     loadJS("./postmessage-robot.js");
//   else if(mode === 'test')
//     loadJS("./test-robot.js");
//   else if(mode === 'robot')
//     loadJS("./websocket-robot.js");
//   console.log("Mode: " + mode);
//   parent.postMessage({'mode': mode}, '*');
// }

// function loadJS(file) {
//   var script = document.createElement("script");
//   script.type = "application/javascript";
//   script.src = file;
//   document.body.appendChild(script);
// }
