/*Grupo 5
    Ney Casilla 1057512
    Haydee Mayers 1057100
    Hernan Cortez 1056025
    Miguel Oviedo 1053442
*/
var from;
var fuerza;
var Space = new cp.Space();
Space.gravity =cp.v(0,-100);
Space.sleepTimeThreshold = 0.5;
Space.colisionSlop = 0.5;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    redBird:null,
    BirdNode:null,
    cajas: [],
    cerdos:[],
    bottomWall:null,
    upperWall:null,
    rightWall:null,
    leftWall:null,
    crash2: function(){
    var bird = this.BirdNode.getBoundingBox();
      for(var pgnode of this.cerdos){
            var b = pgnode.getBoundingBox();
            if(cc.rectIntersectsRect(bird,b)){
                this.removeChild(pgnode,true);
            }
        }  
    },
    began:function(location,event){
        var game  = event.getCurrentTarget();
        var loc = location.getLocation();
        from = loc;
        cc.log("from "+from.x+" "+from.y);
        
        return true;
    },
    cals: function(location, event){
        var game  = event.getCurrentTarget();
        var loc = location.getLocation();
        
        fuerza = loc;
        
        fuerza.x = fuerza.x-from.x;
        fuerza.y = fuerza.y-from.y;
        cc.log("to "+fuerza.x+" "+fuerza.y);
        
    },
    move: function(location,event){
        var game  = event.getCurrentTarget();
        var loc = location.getLocation();

        if(fuerza.x<100){
            if(fuerza.y<100){
                var fly = cc.JumpTo.create(2,cc.p(400,100),100,1);
                game.BirdNode.runAction(fly);
            }
            if(fuerza.y===100){
                var fly = cc.JumpTo.create(2,cc.p(500,100),200,1);
                game.BirdNode.runAction(fly);
            }
            if(fuerza.y>100){
                var fly = cc.JumpTo.create(2,cc.p(600,100),300,1);
                game.BirdNode.runAction(fly);
            }
        }
        if(fuerza.x===100){
            if(fuerza.y<100){
                var fly = cc.JumpTo.create(1,cc.p(600,100),300,1);
                game.BirdNode.runAction(fly);
            }
            if(fuerza.y===100){
                var fly = cc.JumpTo.create(2,cc.p(700,100),400,1);
                game.BirdNode.runAction(fly);
            }
            if(fuerza.y>100){
                var fly = cc.JumpTo.create(2,cc.p(800,100),500,1);
                game.BirdNode.runAction(fly);
            }
        }
        if(fuerza.x>100){
            if(fuerza.y<100){
                var fly = cc.JumpTo.create(2,cc.p(700,100),500,1);
                game.BirdNode.runAction(fly);
            }
            if(fuerza.y===100){
                var fly = cc.JumpTo.create(2,cc.p(800,100),600,1);
                game.BirdNode.runAction(fly);
            }
            if(fuerza.y>100){
                cc.log("fly away!");
                var fly = cc.JumpTo.create(2,cc.p(900,100),700,1);
                game.BirdNode.runAction(fly);
            }
            
        }
    },
    pig : function(x,y){
        for(var i=0;i<1;i++){
            var pig = new cc.Sprite(res.Minion_pig_copy_png);
            var pigz = pig.getContentSize(),
            pgnode = cc.PhysicsSprite.create(res.Minion_pig_copy_png),
            pgbody = null,
            pgShape = null,
            pgscaleX =0.05,
            pgscaleY =0.05;
            pigz.width *= pgscaleX;
            pigz.height *=pgscaleY;

            pgbody = Space.addBody(new cp.Body(2, cp.momentForBox(2, pigz.width, pigz.height)));
            pgbody.setPos(cc.p(x,y));

            pgShape = Space.addShape(new cp.CircleShape(pgbody,pigz.width *0.5,cc.p(0,0)));
            pgShape.setFriction(0.5);
            pgShape.setElasticity(0);
            pgShape.setCollisionType(2);

            pgnode.setBody(pgbody);
            pgnode.setRotation(0);
            pgnode.setScale(0.05);
            this.cerdos.push(pgnode);
            
            this.addChild(pgnode);
        }
    },
    boxes: function(x,y,amount){
        mass = 5;
       for (var i = 0;i<amount;i++){
            var box = new cc.Sprite(res.box_png);
            var bg = box.getContentSize(),
                node = cc.PhysicsSprite.create(res.box_png),
                bodys = null,
                Shape = null,
                scaleX =0.5,
                scaleY =0.5;
            bg.width *= scaleX;
            bg.height *=scaleY;
            bodys = new cp.Body(mass, cp.momentForBox(mass, bg.width, bg.height));
           if(i>0){
               y=y+150;
           }
            bodys.setPos(cc.p(x,y));
            Space.addBody(bodys);

            Shape = Space.addShape(new cp.BoxShape(bodys,bg.width,bg.height));
            Shape.setFriction(0.5);
            Shape.setElasticity(0);
                Shape.setCollisionType(2);

            node.setBody(bodys);
            node.setRotation(0);
            node.setScale(0.5);
           this.cajas.push(node);
            
            this.addChild(node);
                
        }  
    },
    ctor:function () {
        //Este es el proyecto final, aqui tendrán que hacer todo desde cero
        this._super();
        var size = cc.winSize;
        
        this.mouse = cp.v(0,0);
        var helloLabel = new cc.LabelTTF("Angry INTEC", "Arial", 38);
        helloLabel.setPosition(size.width / 2, size.height / 2 + 200);
        this.addChild(helloLabel, 5);

        this.sprite = new cc.Sprite(res.Background_png);
        this.sprite.setPosition(size.width, size.height);
        this.addChild(this.sprite, 0);
        var mass = 10;
        this.boxes(500,200,6);

        this.boxes(800,200,6);
        
        this.redBird=new cc.Sprite(res.Angry_Bird_red_png);
        
        this.pig(750,400);
        this.pig(600,400);
        this.pig(700,400);
        this.pig(750,600);
        this.pig(600,600);
        this.pig(700,600);
        var BirdSize = this.redBird.getContentSize();
        this.BirdNode = cc.PhysicsSprite.create(res.Angry_Bird_red_png);
        var BirdBody = null;
        var BirdShape = null;
        var scaleX = 0.02;
        var scaleY = 0.02;
        BirdSize.width *= scaleX;
        BirdSize.height *= scaleY;

        
        BirdBody = Space.addBody(new cp.Body(mass, cp.momentForBox(mass, BirdSize.width, BirdSize.height)));
        BirdBody.setPos(cc.p(150,200));

        BirdShape = Space.addShape(new cp.CircleShape(BirdBody, BirdSize.width * 0.5, cc.p(0, 0)));
        BirdShape.setFriction(0.5);
        BirdShape.setElasticity(2);
        BirdShape.setCollisionType(2);

        this.BirdNode.setBody(BirdBody);
        this.BirdNode.setRotation(100);
        this.BirdNode.setScale(0.02);

        this.addChild(this.BirdNode);
        
        var update = function(){
            Space.step(1/60);
        }

        
        this.leftWall = new cp.SegmentShape(Space.staticBody, new cp.v(0, 0), new cp.v(0, cc.winSize.height), 5);
        this.leftWall.setElasticity(0.5);
        this.leftWall.setFriction(1);
        Space.addStaticShape(this.leftWall);

        this.rightWall = new cp.SegmentShape(Space.staticBody, new cp.v(cc.winSize.width, cc.winSize.height), new cp.v(cc.winSize.width, 0), 5);
        this.rightWall.setElasticity(0.5);
        this.rightWall.setFriction(1);
        Space.addStaticShape(this.rightWall);
        

        this.bottomWall = new cp.SegmentShape(Space.staticBody, new cp.v(0, 100), new cp.v(cc.winSize.width, 100), 5);
        this.bottomWall.setElasticity(0.5);
        this.bottomWall.setFriction(1);
        Space.addStaticShape(this.bottomWall);
        
        this.upperWall = new cp.SegmentShape(Space.staticBody, new cp.v(0, cc.winSize.height), new cp.v(0, cc.winSize.height), 5);
        this.upperWall.setElasticity(0.5);
        this.upperWall.setFriction(1);
        Space.addStaticShape(this.upperWall);

        Space.addCollisionHandler(1,2,null,null,null,null);
        
         this.schedule(update);
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.began,
            onTouchMoved: this.cals,
            onTouchEnded: this.move,
            
        },this);

        this.schedule(this.crash2,0);
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

