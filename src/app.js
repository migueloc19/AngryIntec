
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //Este es el proyecto final, aqui tendrán que hacer todo desde cero
        this._super();
        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("Angry INTEC", "Arial", 38);
        helloLabel.setPosition(size.width / 2, size.height / 2 + 200);
        this.addChild(helloLabel, 5);

        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.sprite, 0);

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

