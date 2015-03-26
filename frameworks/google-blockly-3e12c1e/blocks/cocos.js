/**
 * Created by Okul dersleri(Kadir) on 18-3-2015.
 */

'use strict';

goog.provide('Blockly.Blocks.cocos');
goog.require('Blockly.Blocks');

Blockly.Blocks['sprite_custom'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(230);
        this.appendValueInput("posX")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("SpritePos-X");
        this.appendValueInput("posY")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("SpritePos-Y");
        this.setInputsInline(true);
        this.setTooltip('');
    }
};