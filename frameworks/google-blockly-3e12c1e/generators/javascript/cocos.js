/**
 * Created by Okul dersleri(Kadir) on 18-3-2015.
 */

'use strict';

goog.provide('Blockly.JavaScript.cocos');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['sprite_custom'] = function(block) {
  var x_pos = Blockly.JavaScript.valueToCode(block, "posX", Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var y_pos = Blockly.JavaScript.valueToCode(block, "posY", Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;


  plist = res.jumpUp_plist;
  spriteIndex = "#runnerJumpUp0.png";
  spriteImage = res.jumpUp_png;

  g_runnerStartX = parseInt(x_pos);
  g_groundHeight = parseInt(y_pos);


  return ["ret", Blockly.JavaScript.ORDER_NONE]
};




