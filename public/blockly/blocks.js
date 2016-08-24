// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#46he25
Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("turn_left");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Turn the robot left for specified time in ms');
  }
};

Blockly.JavaScript['turn_left'] = function(block) {
  var code = 'robot_left();\n';
  return code;
};

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("turn_right");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Turn the robot right for specified time in ms');
  }
};

Blockly.JavaScript['turn_right'] = function(block) {
  var code = 'robot_right();\n';
  return code;
};

Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("forward");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Move the robot forwards for specified time in ms');
  }
};

Blockly.JavaScript['forward'] = function(block) {
  var code = 'robot_forward();\n';
  return code;
};

Blockly.Blocks['backward'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("backward");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Move the robot backwards for specified time in ms');
  }
};

Blockly.JavaScript['backward'] = function(block) {
  var code = 'robot_backward();\n';
  return code;
};

Blockly.Blocks['stop'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("stop");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Stop the bot!');
  }
};

Blockly.JavaScript['stop'] = function(block) {
  var code = 'robot_stop();\n';
  return code;
};

Blockly.Blocks['ping'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("ping");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Trigger a distance update');
  }
};

Blockly.JavaScript['ping'] = function(block) {
  var code = 'robot_ping();\n';
  return code;
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ropyyd
Blockly.Blocks['get_distance'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("get_distance");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(210);
    this.setTooltip('Get the distance to the nearest obstacle in front of the robot in cm');
  }
};

Blockly.JavaScript['get_distance'] = function(block) {
  var code = 'robot_get_distance()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['led_on'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("LED on");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Turn on the LED');
  }
};

Blockly.JavaScript['led_on'] = function(block) {
  var code = 'robot_ledOn();\n';
  return code;
};

Blockly.Blocks['led_off'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("LED off");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Turn off the LED');
  }
};

Blockly.JavaScript['led_off'] = function(block) {
  var code = 'robot_ledOff();\n';
  return code;
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#b99xcz
Blockly.Blocks['wait'] = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendField("wait");
    this.appendValueInput("time")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('Specify a delay in ms');
  }
};

Blockly.JavaScript['wait'] = function(block) {
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'wait(' + time + ');\n';
  return code;
};
