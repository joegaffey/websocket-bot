var CRASH = -1;
var FINISH = -2;

var SPEED = 0.4,
    SPEED_TO_ROT = 30,
    MIN_DISTANCE = 0,
    OBSTACLE_PADDING = 54;

var gameOver = true;

var bot = {};
var home = {};
var obstacles = [];
var distance = 999;
var distanceMessage = "Closest obstacle: "

var stage = new PIXI.Container();

// viewport dimensions
var baseWidth = Math.floor(window.innerWidth);
var baseHeight = Math.floor(window.innerHeight);
// scene dimensions
var projectedWidth = 600;
var projectedHeight = 600;
// viewport aspect ratio
var aspectRatio = baseWidth / baseHeight;
// renderer acctual dimensions
var rendererWidth = projectedWidth * aspectRatio;
var rendererHeight = projectedHeight;
renderer = PIXI.autoDetectRenderer(rendererWidth, rendererHeight, { view: document.getElementById("stage") });

var botImgUrl = './media/robot.png';
var obsImgUrl = './media/cone.png';
var homeImgUrl = './media/home.png';

var winStyle = {
    font: 'bold 64px Arial',
    fill: 'green',
    align: 'center',
    stroke: 'white',
    strokeThickness: 10,
    lineJoin: 'round'
}

var loseStyle = {
    font: 'bold 64px Arial',
    fill: 'red',
    align: 'center',
    stroke: 'white',
    strokeThickness: 10,
    lineJoin: 'round'
}

var distanceStyle = {
    font: '16px Arial',
    fill: 'black'
}

var winText = new PIXI.Text("Mission Complete!", winStyle);
var loseText = new PIXI.Text("Mission Failed!", loseStyle);
var distanceText = new PIXI.Text(distanceMessage + distance, distanceStyle);

document.getElementById("sim").appendChild(renderer.view);

PIXI.loader
  .add(botImgUrl)
  .add(obsImgUrl)
  .add(homeImgUrl)
  .load(setup);

function setupObstacles() {
    var tex = PIXI.loader.resources[obsImgUrl].texture;
    for(var i = 0; i < 6; i++)
      obstacles.push(new PIXI.Sprite(tex));

    var xPositions = [100, renderer.width - 100, 100, renderer.width - 100, renderer.width / 2];
    var yPositions = [renderer.height - 100, 100, 100, renderer.height - 100, renderer.height / 2];

    obstacles.forEach(function (obstacle, i) {
      obstacle.position.x = xPositions[i];
      obstacle.position.y = yPositions[i];
      obstacle.anchor.set(0.5, 0.5);
      stage.addChild(obstacle);
    });
}

function setup() {
  bot = new PIXI.Sprite(
    PIXI.loader.resources[botImgUrl].texture
  );

  home = new PIXI.Sprite(
    PIXI.loader.resources[homeImgUrl].texture
  );
  home.x = renderer.width / 2;
  home.y = 50;
  home.anchor.set(0.5, 0.5);

  winText.x = renderer.width / 2;
  winText.y = renderer.height / 2;
  winText.anchor.set(0.5, 0.5);

  loseText.x = renderer.width / 2;
  loseText.y = renderer.height / 2;
  loseText.anchor.set(0.5, 0.5);

  distanceText.x = 5;
  distanceText.y = 5;

  setupObstacles();
  renderer.backgroundColor = 0xDDDDDD;
  bot.anchor.set(0.5, 0.5);
  sim_robot_reset();

  stage.addChild(distanceText);
  stage.addChild(home);
  stage.addChild(bot);

  renderer.render(stage);
  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  play();
  renderer.render(stage);
}

function move() {
  bot.x = bot.x + bot.speed * Math.cos(bot.rotation - 1.5708);
  bot.y = bot.y + bot.speed * Math.sin(bot.rotation - 1.5708);

  if(bot.rotLeft) {
    bot.rotation -= (SPEED / SPEED_TO_ROT);
  }
  if(bot.rotRight) {
    bot.rotation += (SPEED / SPEED_TO_ROT);
  }
}

function sim_robot_reset() {
  sim_robot_stop();
  stage.removeChild(winText);
  stage.removeChild(loseText);
  bot.x = renderer.width / 2;
  bot.y = renderer.height - 100;
  bot.rotation = 0;
  gameOver = true;
}

function sim_robot_stop() {
  bot.speed = 0;
  bot.rotLeft = false;
  bot.rotRight = false;
}

function sim_robot_forward() {
  gameOver = false;
  sim_robot_stop();
  bot.speed = SPEED;
}

function sim_robot_backward() {
  gameOver = false;
  sim_robot_stop();
  bot.speed = -SPEED;
}

function sim_robot_left() {
  gameOver = false;
  sim_robot_stop();
  bot.rotLeft = true;
}

function sim_robot_right() {
  gameOver = false;
  sim_robot_stop();
  bot.rotRight = true;
}

function robot_say(text) {
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function play() {
  if(gameOver)
    return;
  move();
  if(homeReached() && !gameOver) {
    sim_robot_stop();
    stage.addChild(winText);
    parent.postMessage({'distance': FINISH }, '*');
    gameOver = true;
    return;
  }
  distance = Math.min(getMinWallDistance(), getMinObstacleDistance());
  distanceText.text = distanceMessage + distance;

  if (distance <= MIN_DISTANCE && !gameOver) {
    sim_robot_stop();
    stage.addChild(loseText);
    parent.postMessage({'distance': CRASH }, '*');
    gameOver = true;
    return;
  }
  if(!gameOver)
    simSendMessage(distance);
}

function getMinWallDistance() {
  var xDist = -1, yDist = -1;

  if(bot.x > renderer.width / 2)
    xDist = renderer.width - (bot.x + (bot.width / 2));
  else
    xDist = bot.x - (bot.width / 2);

  if(bot.y > renderer.height / 2)
    yDist = renderer.height - (bot.y + (bot.height / 2));
  else
    yDist = bot.y - (bot.height / 2);
  return Math.round(Math.min(xDist, yDist));
}

function homeReached() {
  var a = home.x - bot.x;
  var b = home.y - bot.y;
  // Pythagoras FTW!!!
  var c = Math.sqrt( a*a + b*b );
  if(c < 40)
    return true;
  else
    return false;
}

function getMinObstacleDistance() {
  var dist = 9999;
  obstacles.forEach(function (o, i) {
    var a = o.x - bot.x;
    var b = o.y - bot.y;
    // Pythagoras FTW again!!!
    var c = Math.sqrt( a*a + b*b );
    if(c < dist)
      dist = c;
  });
  return Math.round(dist) - OBSTACLE_PADDING;
}

function simSendMessage(distance){
  parent.postMessage({'distance': distance}, '*');
}

function simMessageListener(event) {
  if(event.data.action && gameOver) {
    gameOver = false;
  }
  switch(event.data.action) {
    case robot.actions.stop:
        sim_robot_stop();
        break;
    case robot.actions.forward:
        sim_robot_forward();
        break;
    case robot.actions.backward:
        sim_robot_backward();
        break;
    case robot.actions.right:
        sim_robot_right();
        break;
    case robot.actions.left:
        sim_robot_left();
        break;
    case robot.actions.reset:
        sim_robot_reset();
        break;
    default:
      break;
  }
}

addEventListener('message', simMessageListener);
