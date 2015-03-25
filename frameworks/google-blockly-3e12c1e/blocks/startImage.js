/**
 * Created by The D on 24-3-2015.
 */
'use strict';

goog.provide('Blockly.Blocks.startImage');

goog.require('Blockly.Blocks');

Blockly.Blocks['start_image'] = {

    init: function() {
        this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
        this.setColour(0);
        var dropdown = new Blockly.FieldDropdown([['default', 'DEFAULT'], ['girly', 'GIRLY']]);
        this.appendDummyInput()
            .appendField('Select your start background')
            .appendField(dropdown, 'startImage');
        this.setTooltip('Set the background image at start');
        this.setPreviousStatement(true);
    }
};