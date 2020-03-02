import Phaser from '../libs/phaser-wx.js'
import PIXI from '../libs/pixi-wx.js'
export default class PankingState extends Phaser.State{

  constructor(game) {
    super();
    this.game = game;
  }

  restar()
  {
    this.game.state.start('menu');
  }

  create()
  {
    this.game.stage.backgroundColor = '#efe977';
    var style = { font: "30px Arial", fill: "#FFFFFF" };		//定义游戏操作说明文字风格
    var x = this.game.world.width / 2;
    var y = this.game.world.height / 2;
    this.bg = this.game.add.tileSprite(0, 0, 400, 490, 'bg');		//在game.world中坐标(0,0)处画出预加载游戏资源，背景图片
    this.bg.autoScroll(-25, 0);
    this.bo = this.game.add.tileSprite(0, this.world.centerY + 150, 395, 135, 'bo');
    //this.bo = this.game.add.sprite(0, 132, 'bo');		//也是背景图片，我的背景由两个背景透明的图片组合而成，其实可以合二为一
    this.bo.autoScroll(-25, 0);
    this.game.add.button(this.world.centerX*0.8, this.world.centerY*1.65, "restar", this.restar, this);
    // this.menu = this.game.add.sprite(0, 0, 'menu');		//加载menu图片
    this.logo = this.game.add.sprite(50, 50, 'menus', 'menu_03');




    Phaser.XTexture = function (xCanvas, x, y, w, h) { return new PIXI.Texture(new PIXI.BaseTexture(xCanvas), new PIXI.Rectangle(x, y, w, h)); };
    var openDataContext = wx.getOpenDataContext();
    var sharedCanvas = openDataContext.canvas;
    var pad = this.game.add.sprite(0, 0, Phaser.XTexture(sharedCanvas, 0, 0, this.game.width, this.game.height));
 
    openDataContext.postMessage({
      action: 'get',
      data: {
        gameAspect: [this.game.width, this.game.height],
        score: 0
      },
    });


  }
}