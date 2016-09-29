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

  var VOICE_PITCH = 0.1;
  var VOICE_RATE = 1;

  this.left = function() {
    this.robot_say('Bearing left');
    safeSend(this.actions.left);
  };

  this.right = function() {
    this.robot_say('Bearing right');
    safeSend(this.actions.right);
  };

  this.forward = function() {
    this.robot_say('Advancing');
    safeSend(this.actions.forward);
  };

  this.backward = function() {
    this.robot_say('Reversing');
    safeSend(this.actions.backward);
  };

  this.ledOn = function() {
    this.robot_say('LED on');
    safeSend(this.actions.ledOn);
  };

  this.ledOff = function() {
    this.robot_say('LED off');
    safeSend(this.actions.ledOff);
  };

  this.stop = function() {
    this.safeSend(this.actions.stop);
  };

  this.ping = function() {
    this.robot_say('Ping');
    safeSend(this.actions.ping);
  };

  this.reset = function() {
    try {
      window.speechSynthesis.cancel();
    }
    catch(err) {
      console.log(err);
    }
    this.robot_say('Rebooting');
    safeSend(this.actions.reset);
  };

  this.set_speed = function(speed) {
    this.robot_say('Speed is ' + speed);
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
    this.robot_say(CRASH_SPEECH);
  }

  function handleFinish() {
    console.log('Finished');
    this.robot_say(FINISH_SPEECH);
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
    try {
      var speech = new SpeechSynthesisUtterance(text)
      speech.pitch = VOICE_PITCH;
      speech.rate = VOICE_RATE;
      window.speechSynthesis.speak(speech);
    }
    catch(err) {
      console.log(err);
    }
  }
};
