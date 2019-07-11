import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    p1: Laya.Sprite;
    p2: Laya.Sprite;
    p3: Laya.Sprite;
    l1: Laya.Label;
    btn1: Laya.Button;
    btn2: Laya.Button;
    testType: number = 1;

    rectWidth: number = 200;
    rectHeight: number = 100;
    circleRadius: number = 100;
    constructor()
    {
		const Stage = Laya.Stage;        
        Laya.init(1000,800, WebGL);
		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
		Laya.stage.bgColor = "#232628"; 

        this.l1 = new Laya.Label();
        this.l1.text = ""
        this.l1.fontSize = 24;
        this.l1.color = "#ffffff";
        this.l1.pos(0,0);
        Laya.stage.addChild(this.l1);

        this.btn1 = new Laya.Button();
        this.btn2 = new Laya.Button();
        this.btn1.pos(100, 50);
        this.btn2.pos(100, 100);
        this.btn1.label = "点击测试两个旋转举行碰撞";
        this.btn2.label = "点击测试圆和旋转举行碰撞";
        this.btn1.labelSize = 24;
        this.btn2.labelSize = 24;
        this.btn1.labelColors = "#ffffff";
        this.btn2.labelColors = "#ffffff";
        this.btn1.width = 300;
        this.btn1.height = 50;
        this.btn2.width = 300;
        this.btn2.height = 50;
        Laya.stage.addChild(this.btn1);
        Laya.stage.addChild(this.btn2);

        this.btn1.on(Laya.Event.CLICK, this, this.onBtn1Clicked);
        this.btn2.on(Laya.Event.CLICK, this, this.onBtn2Clicked);

       this.p1 = new Laya.Sprite();
       this.p2 = new Laya.Sprite();
       this.p1.graphics.drawRect(0,0,this.rectWidth,this.rectHeight,"#ffff00");
       this.p1.pivot(50, 50);//锚点不放在矩形中心点，测试不以中心点旋转的碰撞
       this.p1.pos(100, 200);
       this.p1.width = this.rectWidth;
       this.p1.height = this.rectHeight;
       Laya.stage.addChild(this.p1);

       this.p2.graphics.drawRect(0,0,this.rectWidth,this.rectHeight,"#ffffff");
       this.p2.pos(100, 350);
       this.p2.pivot(150,50);//锚点不放在矩形中心点，测试不以中心点旋转的碰撞
       this.p2.width = this.rectWidth;
       this.p2.height = this.rectHeight;       
       Laya.stage.addChild(this.p2);

       this.p3 = new Laya.Sprite();
       this.p3.graphics.drawCircle(0,0,this.circleRadius,"#ffff00");
       this.p3.pos(300,400);
       this.p3.width = 2*this.circleRadius;
       this.p3.height = 2*this.circleRadius;
       Laya.stage.addChild(this.p3);

       Laya.timer.loop(200, this, this.checkCollision);
       Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);

       this.p1.on(Laya.Event.MOUSE_DOWN, this, this.onStartDrag1);
       this.p2.on(Laya.Event.MOUSE_DOWN, this, this.onStartDrag2);
       this.p3.on(Laya.Event.MOUSE_DOWN, this, this.onStartDrag3);

       this.p1.visible = false;
       this.p2.visible = false;
       this.p3.visible = false;
    }

    
    onBtn1Clicked(){
        this.testType = 1;
        this.p1.visible = true;
        this.p2.visible = true;
        this.p3.visible = false;
        this.l1.text = "按 A 键旋转黄色矩形，用鼠标拖动；按 B 键旋转白色矩形，用鼠标拖动";
    }

    onBtn2Clicked(){
        this.testType = 2;
        this.p1.visible = true;
        this.p2.visible = false;
        this.p3.visible = true;
        this.l1.text = "按 A 键旋转黄色矩形，用鼠标拖动";
    }


    checkCollision(){
        var point1 = this.p1.localToGlobal(new Laya.Point(this.rectWidth/2,this.rectHeight/2));
        var point2 = this.p2.localToGlobal(new Laya.Point(this.rectWidth/2,this.rectHeight/2));
        var o1 = new OBB(point1.x, point1.y, this.p1.width, this.p1.height, this.p1.rotation);
        var o2 = new OBB(point2.x, point2.y, this.p2.width, this.p2.height, this.p2.rotation);

        if(this.testType == 1){
            if(OBB.IsOverlap(o1,o2)){
                this.p1.graphics.drawRect(0,0,this.rectWidth,this.rectHeight,"#00ffff");
                this.p2.graphics.drawRect(0,0,this.rectWidth,this.rectHeight,"#00ffff");
            }
            else{
                this.p1.graphics.drawRect(0,0,this.rectWidth,this.rectHeight,"#ffff00");
                this.p2.graphics.drawRect(0,0,this.rectWidth,this.rectHeight,"#ffffff");
            }
        }
        else{
            if(CircleRect.IsOverLap(this.p3.x, this.p3.y, this.circleRadius, point1.x, point1.y, this.p1.width, this.p1.height, this.p1.rotation)){
                this.p1.graphics.drawRect(0,0, this.rectWidth, this.rectHeight,"#00ffff");
                this.p3.graphics.drawCircle(0,0,this.rectHeight,"#00ffff");
            }
            else{
                this.p1.graphics.drawRect(0,0, this.rectWidth, this.rectHeight,"#ffff00");
                this.p3.graphics.drawCircle(0,0,this.circleRadius,"#ffff00");
            }
        }       
    }

    onKeyDown(e){
        if(e["keyCode"] == Laya.Keyboard.A){
            this.p1.rotation += 10;
        }
        else if(e["keyCode"] == Laya.Keyboard.B){
            this.p2.rotation += 10;
        }

    }

    onStartDrag1(e){
        this.p1.startDrag();
    }

    onStartDrag2(e){
        this.p2.startDrag();
    }

    onStartDrag3(e){
        this.p3.startDrag();
    }   
}
new GameMain();