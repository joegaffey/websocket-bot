function keyDownHandler(event) {
  if(event.keyCode > 36 && event.keyCode < 41) {
    arrowDown(event.keyCode);
  }
  else wasd(event.key);
}

function arrowDown(keyCode) {
  switch(keyCode) {
    case 38:
      robot.forward();
      break;
    case 40:
      robot.backward();
      break;
    case 37:
      robot.left();
      break;
    case 39:
      robot.right();
      break;
  }
}

function wasd(key) {
  switch(key) {
    case 'w':
      robot.forward();
      break;
    case 's':
      robot.backward();
      break;
    case 'a':
      robot.left();
      break;
    case 'd':
      robot.right();
      break;
    case ' ':
      robot.stop();
      break;
  }
}
