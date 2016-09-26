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

  var CRASH = -1;
  var FINISH = -2;

  var CRASH_SPEECH = 'The mission has failed. The algorithm is flawed.';
  var FINISH_SPEECH = 'I have reached my destination. The algorithim is satisfactory. Thank you.';

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
      sendMessage(message);
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
  function robot_say(text) {
    if(lastText !== text) {
      lastText = text;
      //window.speechSynthesis.cancel();
      var speech = new SpeechSynthesisUtterance(text)
      speech.pitch = VOICE_PITCH;
      speech.rate = VOICE_RATE;
      window.speechSynthesis.speak(speech);
    }
  }
};
