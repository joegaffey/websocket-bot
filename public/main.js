function modeMessageListener() {
  var simEl = document.getElementById('sim-region');
  if(event.data.mode) {
    if(event.data.mode === 'sim')
      simEl.style.display = 'block';
    else
      simEl.style.display = 'none';
  }
}

addEventListener('message', modeMessageListener);
