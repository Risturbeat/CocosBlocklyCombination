/**
 * Created by The D on 24-3-2015.
 */
'use strict';

goog.provide('Blockly.JavaScript.cocosAudio');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['text_length'] = function(block){
    var musicToPlay = block.getFieldValue('music');
    cc.log("Music starting");

    switch (musicToPlay){
        case 'LINKIN': backgroundMusicToPlay = res.background_mp3;
            cc.log("playing music");
            break;
        case  'METALLICA':backgroundMusicToPlay = res.background_mintjam_mp3;
            break;
        default:
            cc.log("None of the selected music can be found");
            break;
    }

    return ["audio changed", Blockly.JavaScript.ORDER_NONE];


};
