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

var botImpl = null;
function switchMode(mode) {
  if(botImpl && botImpl !== null)
    botImpl.stop();
  botImpl = null;
  if(mode === 'sim')
    botImpl = new PostMessageRobot();
  else if(mode === 'test')
    botImpl = new TestRobot();
  else if(mode === 'robot')
    botImpl = new WebsocketRobot();
  botImpl.start();
  console.log("Mode: " + mode);
  parent.postMessage({'mode': mode}, '*');

  if(window.location.hash.substring(1) !== mode)
    window.location.hash = '#' + mode;
}
