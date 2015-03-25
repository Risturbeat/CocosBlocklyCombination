/**
 * Created by The D on 24-3-2015.
 */
'use strict';

goog.provide('Blockly.JavaScript.startImage');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['start_image'] = function(block){
    var startImageToUse = block.getFieldValue('startImage');

    switch (startImageToUse){
        case 'DEFAULT': startImageToShow = res.helloBG_png;
            cc.log("playing music");
            break;
        case 'GIRLY': startImageToShow = res.girly_png;
            cc.log("playing music");
            break;
        default:
            cc.log("None of the selected music can be found");
            break;
    }
    return ["start image changed", Blockly.JavaScript.ORDER_NONE]

};
