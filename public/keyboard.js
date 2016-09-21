function keyDownHandler(event) {
  if(event.keyCode > 36 && event.keyCode < 41) {
    arrowDown(event.keyCode);
  }
  else wasd(event.key);
}

function arrowDown(keyCode) {
  switch(keyCode) {
    case 38:
      robot_forward();
      break;
    case 40:
      robot_backward();
      break;
    case 37:
      robot_left();
      break;
    case 39:
      robot_right();
      break;
    default:
      robot_stop();
  }
}

function wasd(key) {
  switch(key) {
    case 'w':
      robot_forward();
      break;
    case 's':
      robot_backward();
      break;
    case 'a':
      robot_left();
      break;
    case 'd':
      robot_right();
      break;
    default:
      robot_stop();
  }
}
