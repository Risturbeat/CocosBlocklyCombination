/**
 * Created by The D on 24-3-2015.
 */
'use strict';

goog.provide('Blockly.JavaScript.startGame');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['start_game'] = function(block){
    cc.log("starting game");
    cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MenuScene());
    }, this);
    cc.log("running game");
cc.game.run();
};
