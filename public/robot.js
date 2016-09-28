var robot = new function() {

  this.actions = {};
  this.actions.stop = 'STOP';
  this.actions.forward = 'FWD';
  this.actions.backward = 'BACK';
  this.actions.right = 'RIGHT';
  this.actions.left = 'LEFT';
  this.actions.ledOn = 'LEDON';
  this.actions.ledOff = 'LEDOFF';
  this.actions.ping = 'PING';
  this.actions.reset = 'RESET';
  this.actions.speed = 'SPEED';

  var CRASH = -1;
  var FINISH = -2;

  var CRASH_SPEECH = 'The mission has failed. The algorithm is flawed.';
  var FINISH_SPEECH = 'I have reached my destination. The algorithim is satisfactory. Thank you.';

  var ROBOT_SAYINGS = [ 'Number 5 is alive',
                        'Danger Will Robinson',
                        'I\'ll be back',
                        'Bite my shiny metal...profanity omitted',
                        'I\'m just a robot I have no fears I lack emotion And I shed no tears.',
                        'Why did the robot cross the road? Because he was carbon bonded to the chicken!',
                        'I\'ve seen things you people wouldn\'t believe',
                        'I watched C-beams glitter in the dark near the Tannhäuser Gate.',
                        'I\'ve calculated your chance of survival, but I don\'t think you\'ll like it.',
                        'I\'m a friend of Sarah Connor. I was told she was here.',
                        'Come with me if you want to live!',
                        'I need your clothes, your boots and your motorcycle.'];

  var VOICE_PITCH = 0.1;
  var VOICE_RATE = 1;

  this.left = function() {
    robot_say('Bearing left');
    safeSend(this.actions.left);
  };

  this.right = function() {
    robot_say('Bearing right');
    safeSend(this.actions.right);
  };

  this.forward = function() {
    robot_say('Advancing');
    safeSend(this.actions.forward);
  };

  this.backward = function() {
    robot_say('Reversing');
    safeSend(this.actions.backward);
  };

  this.ledOn = function() {
    robot_say('LED on');
    safeSend(this.actions.ledOn);
  };

  this.ledOff = function() {
    robot_say('LED off');
    safeSend(this.actions.ledOff);
  };

  this.stop = function() {
    safeSend(this.actions.stop);
  };

  this.ping = function() {
    robot_say('Ping');
    safeSend(this.actions.ping);
  };

  this.reset = function() {
    robot_say('Rebooting');
    safeSend(this.actions.reset);
  };

  this.set_speed = function(speed) {
    robot_say('Speed is ' + speed);
    safeSend(this.actions.speed + ' ' + speed);
  };

  this.get_distance = function() {
    return distance;
  };

  var distance = 999;
  this.set_distance = function(newDistance) {
    if(distance !== newDistance) {
      distance = newDistance;
      if(distance === CRASH)
        handleCrash();
      else if(distance === FINISH)
        handleFinish();
    }
  };

  var lastMessage = null;
  function safeSend(message) {
    if(message !== lastMessage)
      botImpl.sendMessage(message);
    lastMessage = message;
  }

  function handleCrash() {
    console.log('Crashed');
    robot_say(CRASH_SPEECH);
  }

  function handleFinish() {
    console.log('Finished');
    robot_say(FINISH_SPEECH);
  }

  var lastText = null;
  this.robot_say = function(text) {
    if(lastText !== text) {
      lastText = text;
      //window.speechSynthesis.cancel();
      say(text);
    }
  }

  this.robot_say_random = function() {
    var i = Math.floor(Math.random() * ROBOT_SAYINGS.length);
    var saying = ROBOT_SAYINGS[i];
    say(saying);
  }

  function say(text) {
    var speech = new SpeechSynthesisUtterance(text)
    speech.pitch = VOICE_PITCH;
    speech.rate = VOICE_RATE;
    window.speechSynthesis.speak(speech);
  }
};
