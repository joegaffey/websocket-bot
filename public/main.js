var botImpl = null;
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
  var simEl = document.getElementById('sim-region');
  if(botImpl && botImpl !== null)
    botImpl.stop();
  botImpl = null;
  if(mode === 'sim') {
    botImpl = new PostMessageRobot();
    simEl.style.display = 'block';
  }
  else
    simEl.style.display = 'none';
  if(mode === 'test')
    botImpl = new TestRobot();
  else if(mode === 'robot')
    botImpl = new WebsocketRobot();
  botImpl.start();
  console.log("Mode: " + mode);
  parent.postMessage({'mode': mode}, '*');
}
