var keyEvent = null;
var zoom = {  controls: true,
              wheel: true,
              startScale: 1.0,
              maxScale: 3,
              minScale: 0.3,
              scaleSpeed: 1.2 };


document.addEventListener('keydown', (event) => {
  keyEvent = event
}, false);

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
    return interpreter.createPrimitive(robot.left());
  };
  interpreter.setProperty(scope, 'robot_left', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot.right());
  };
  interpreter.setProperty(scope, 'robot_right', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot.forward());
  };
  interpreter.setProperty(scope, 'robot_forward', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot.backward());
  };
  interpreter.setProperty(scope, 'robot_backward', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot.stop());
  };
  interpreter.setProperty(scope, 'robot_stop', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot.ledOn());
  };
  interpreter.setProperty(scope, 'robot_ledOn', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot.ledOff());
  };
  interpreter.setProperty(scope, 'robot_ledOff', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot.get_distance());
  };
  interpreter.setProperty(scope, 'robot_get_distance', interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(robot.ping());
  };
  interpreter.setProperty(scope, 'robot_ping', interpreter.createNativeFunction(wrapper));

  var wrapper = function(speed) {
    return interpreter.createPrimitive(robot.set_speed(speed));
  };
  interpreter.setProperty(scope, 'robot_set_speed', interpreter.createNativeFunction(wrapper));

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

var workspace = null;
setupBlockly();
function setupBlockly() {
  // fetch('./toolbox.xml').then(function(response) {
  // 	return response.text();
  // }).then(function(text) {
	//   toolboxEl.outerHTML = text;
  // });

  var toolboxEl = document.getElementById('toolbox');
  workspace = Blockly.inject('blockly', { media: './blockly/media/', toolbox: toolboxEl, zoom: zoom });
  Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
}
