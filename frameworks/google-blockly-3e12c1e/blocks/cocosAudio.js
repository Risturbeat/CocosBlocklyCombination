/**
 * Created by The D on 24-3-2015.
 */
'use strict';

goog.provide('Blockly.Blocks.cocosAudio');

goog.require('Blockly.Blocks');

Blockly.Blocks['text_length'] = {

    init: function() {
        this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
        this.setColour(0);
        var dropdown = new Blockly.FieldDropdown([['Linkin Park', 'LINKIN'], ['Metallica', 'METALLICA']]);
        this.appendDummyInput()
            .appendField('Select your music')
            .appendField(dropdown, 'music');
        this.setTooltip('Set the background music');
        }
};