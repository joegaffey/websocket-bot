var frame_id = 'blockly';

var keyEvent = null;

document.addEventListener('keydown', (event) => {
  keyEvent = event
}, false);

if(window.self !== window.top)
  addEventListener('message', messageListener);

function messageListener() {
  if(event.data.mode) {
    switchMode(event.data.mode);
  }
}

processHash();

window.onhashchange = function() {
  processHash();
};

function processHash() {
  switchMode(window.location.hash.substring(1));
}

function switchMode(mode) {
  if(mode == 'sim')
    loadJS("../postmessage-robot.js");
  else if(mode == 'test')
    loadJS("../test-robot.js");
  else if(mode == 'robot')
    loadJS("../websocket-robot.js");
  console.log("Mode: " + mode);
}

function loadJS(file) {
  var script = document.createElement("script");
  script.type = "application/javascript";
  script.src = file;
  document.body.appendChild(script);
}

function get_key_char() {
  if(keyEvent)
    return keyEvent.key;
  else
    return '';
}

function get_key_code() {
  if(keyEvent)
    return keyEvent.keyCode;
  else
    return '';
}

var toolboxEl = document.getElementById('toolbox');
var zoom = {  controls: true,
              wheel: true,
              startScale: 1.0,
              maxScale: 3,
              minScale: 0.3,
              scaleSpeed: 1.2 };
var workspace = Blockly.inject('blocklyDiv', { media: './media/', toolbox: toolboxEl, zoom: zoom });
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

function showCode() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  alert(code);
}

function runCode() {
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    halted = false;
    myInterpreter = new Interpreter(code, initApi);
    nextStep();
  }
  catch (e) {
    console.log(e);
    alert(e);
  }
}

function halt() {
  halted = true;
}

function loadXML(xml) {
  if (typeof xml != "string" || xml.length < 5) {
      alert("No Input");
      return false;
      return;
  }
  try {
      var dom = Blockly.Xml.textToDom(xml);
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
      return true;
  } catch (e) {
      alert("Invalid xml");
      return false;
  }
}

function downloadXML() {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  var a = document.createElement('a');
  var file = new Blob([xmlText], {type:  'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = new Date().getTime() + '.xml';
  a.click();
  window.URL.revokeObjectURL(a.href);
}

function fileSelected(input) {
  var reader = new FileReader();
  console.log(input.files[0]);
  reader.readAsText(input.files[0]);
  reader.onloadend = function() {
    loadXML(reader.result);
  };
}

var myInterpreter = null;

function initApi(interpreter, scope) {

  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));

  var wrapper = function(d) {
    return interpreter.createPrimitive(wait(d));
  };
  interpreter.setProperty(scope, 'wait', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_left());
  };
  interpreter.setProperty(scope, 'robot_left', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_right());
  };
  interpreter.setProperty(scope, 'robot_right', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_forward());
  };
  interpreter.setProperty(scope, 'robot_forward', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_backward());
  };
  interpreter.setProperty(scope, 'robot_backward', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_stop());
  };
  interpreter.setProperty(scope, 'robot_stop', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_ledOn());
  };
  interpreter.setProperty(scope, 'robot_ledOn', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_ledOff());
  };
  interpreter.setProperty(scope, 'robot_ledOff', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_get_distance());
  };
  interpreter.setProperty(scope, 'robot_get_distance', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot_ping());
  };
  interpreter.setProperty(scope, 'robot_ping', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(get_key_char());
  };
  interpreter.setProperty(scope, 'get_key_char', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(get_key_code());
  };
  interpreter.setProperty(scope, 'get_key_code', interpreter.createNativeFunction(wrapper));
}

var nextStepDelay = 0;

function wait(time) {
  nextStepDelay = time;
}

function nextStep() {
  if (!halted && myInterpreter.step()) {
    window.setTimeout(nextStep, nextStepDelay);
    nextStepDelay = 0;
  }
}
