/**
 * Created by Tim on 25-3-2015.
 */
goog.provide('Blockly.JavaScript.cocosTemplate');

goog.require('Blockly.JavaScript');



Blockly.JavaScript['template'] = function(block){
    var musicToPlay = block.statementToCode('music');

    alert("test")
};