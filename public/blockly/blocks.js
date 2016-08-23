// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#46he25
Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("turn_left");
    this.appendValueInput("time")
    .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Turn the robot left for specified time in ms');
  }
};

Blockly.JavaScript['turn_left'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.left(' + value_time + ');\n';
  return code;
};

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("turn_right");
    this.appendValueInput("time")
    .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Turn the robot right for specified time in ms');
  }
};

Blockly.JavaScript['turn_right'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.right(' + value_time + ');\n';
  return code;
};

Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("forward");
    this.appendValueInput("time")
    .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Move the robot forwards for specified time in ms');
  }
};

Blockly.JavaScript['forward'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.forward(' + value_time + ');\n';
  return code;
};

Blockly.Blocks['backward'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("backward");
    this.appendValueInput("time")
    .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('Move the robot backwards for specified time in ms');
  }
};

Blockly.JavaScript['backward'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.backward(' + value_time + ');\n';
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
  var code = 'robot.stop();\n';
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
  var code = 'robot.ping();\n';
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
  var code = 'robot.get_distance()';
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
  var code = 'robot.ledOn();\n';
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
  var code = 'robot.ledOff();\n';
  return code;
};
