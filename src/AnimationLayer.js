if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};
    RunnerStat.running = 0;
    RunnerStat.jumpUp = 1;
    RunnerStat.jumpDown = 2;
}

var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
    runningAction: null,
    sprite: null,
    space:null,
    body:null,
    shape:null,
    jumpUpAction:null,
    jumpDownAction:null,
    recognizer:null,
    fireball:null,
    stat:RunnerStat.running,// init with running status,
    // define enum for runner status


    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(false);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 10);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode,event){
                var target = event.getCurrentTarget();
                cc.log("Key " + keyCode.toString() + " was pressed!");
                target.keyHasBeenPressed(keyCode);
            }
        }, this);
    },
    init:function () {
        this._super();

        // create sprite sheet


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
        this.recognizer = new SimpleRecognizer();
    },
    getEyeX:function () {
        return this.sprite.getPositionX() - g_runnerStartX;
    },
    update:function(dt){
        var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
        statusLayer.updateMeter(this.sprite.getPositionX() - g_runnerStartX);
        // check and update runner stat
        var vel = this.body.getVel();
        if (this.stat == RunnerStat.jumpUp) {
            if (vel.y < 0.1) {
                this.stat = RunnerStat.jumpDown;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.jumpDownAction);
            }
        } else if (this.stat == RunnerStat.jumpDown) {
            if (vel.y == 0) {
                this.stat = RunnerStat.running;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.runningAction);
            }
        }
    },
    initAction:function () {
        // init runningAction
        var animFrames = [];
        // num equal to spriteSheet
        for (var i = 0; i < 2; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
        this.runningAction.retain();

        // init jumpUpAction
        animFrames = [];
        for (var i = 0; i < 2; i++) {
            var str = "runnerJumpUp" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        animation = new cc.Animation(animFrames, 0.2);
        this.jumpUpAction = new cc.Animate(animation);
        this.jumpUpAction.retain();

        // init fireBall
        animFrames = [] ;
        for (var i = 0; i < 2; i++){
            var str = "fireball" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        animation = new cc.Animation(animFrames,0.5);
        this.fireball = new cc.Animate(animation);
        this.fireball.retain();

        // init jumpDownAction
        animFrames = [];
        for (var i = 0; i < 4; i++) {
            var str = "runnerJumpDown" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        animation = new cc.Animation(animFrames, 0.3);
        this.jumpDownAction = new cc.Animate(animation);
        this.jumpDownAction.retain();
    },
addSpriteToAnimationLayer : function(){
    cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
    this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
    this.addChild(this.spriteSheet);

    this.initAction();

    //create runner through physic engine
    this.sprite = new cc.PhysicsSprite("#runner0.png");
    var contentSize = this.sprite.getContentSize();
    // init body
    this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
    this.body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);
    this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
    this.space.addBody(this.body);
    //init shape
    this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
    this.space.addShape(this.shape);

    this.sprite.setBody(this.body);
    this.sprite.runAction(this.runningAction);

    this.spriteSheet.addChild(this.sprite);

    this.scheduleUpdate();
},
    onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
        return true;
    },

    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
    },

    onTouchEnded:function(touch, event) {
        var rtn = event.getCurrentTarget().recognizer.endPoint();
        cc.log("rnt = " + rtn);
        switch (rtn) {
            case "up":
                event.getCurrentTarget().jump();
                break;
            default:
                break;
        }
    },

    jump:function () {
        cc.log("jump");
        if (this.stat == RunnerStat.running) {
            this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
            cc.audioEngine.playEffect(res.jump_mp3);
            this.stat = RunnerStat.jumpUp;
            this.sprite.stopAllActions();
            this.sprite.runAction(this.jumpUpAction);

        }
    },
    onExit:function() {
        this.runningAction.release();
        this.jumpUpAction.release();
        this.jumpDownAction.release();
        this._super();
    },
    keyHasBeenPressed:function(keyCode){
        switch(keyCode){
            case 32:
                var fireball = new cc.PhysicsSprite("#fireball0.png");
                var contentSize = fireball.getContentSize();
                var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
                body.p = cc.p(this.sprite.getPositionX(),this.sprite.getPositionY());
                fireball.setBody(body);
                fireball.runAction(this.fireball);
               // body.applyImpulse(cp.v(0, 0), cp.v(5, 0));

                var actionMove = cc.MoveTo.create(1, cc.p(500, 100));
                fireball.runAction(actionMove);
                this.addChild(fireball);

                cc.log("FIRE");
        }
    }

});

