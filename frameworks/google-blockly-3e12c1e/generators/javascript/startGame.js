/**
 * Created by The D on 24-3-2015.
 */
'use strict';

goog.provide('Blockly.JavaScript.startGame');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['start_game'] = function(block){
    cc.log("running game");
    preLoadAssets();
    cc.log("Started");
    return ["game started", Blockly.JavaScript.ORDER_NONE]
};
