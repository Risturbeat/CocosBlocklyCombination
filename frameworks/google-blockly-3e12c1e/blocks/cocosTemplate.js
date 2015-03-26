/**
 * Created by Tim on 25-3-2015.
 */

goog.provide('Blockly.Blocks.cocosTemplate');

goog.require('Blockly.Blocks');

Blockly.Blocks['template'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(30);
        this.appendStatementInput("music")
            .appendField("music2");
        //this.appendStatementInput("sprite")
        //    .appendField("sprite");
        //this.appendStatementInput("background")
        //    .appendField("background");
        this.setTooltip('');
        this.setDeletable(false);
        this.setMovable(false);
    }
};