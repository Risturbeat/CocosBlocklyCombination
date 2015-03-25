/**
 * Created by The D on 24-3-2015.
 */
'use strict';

goog.provide('Blockly.Blocks.startGame');

goog.require('Blockly.Blocks');

Blockly.Blocks['start_game'] = {

    init: function() {
        this.appendDummyInput()
            .appendField("Start Game");
        this.setColour(0);
        this.setNextStatement(true);
    }
};