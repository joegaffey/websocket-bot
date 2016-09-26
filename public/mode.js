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

  if(window.location.hash.substring(1) !== mode)
    window.location.hash = '#' + mode;
}
