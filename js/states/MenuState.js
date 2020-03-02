import Phaser from '../libs/phaser-wx.js'
export default class MenuState extends Phaser.State {

  constructor(game) {
    super();
    this.game = game;
  }

  create(){
    this.game.stage.backgroundColor = '#efe977';
  var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);		//定义接受按键消息变量
  space_key.onDown.add(this.start, this);		//按键按下时调用start()函数

  var style = { font: "30px Arial", fill: "#FFFFFF" };		//定义游戏操作说明文字风格
    var x = this.game.world.width / 2;
    var y = this.game.world.height / 2;
  this.bg = this.game.add.tileSprite(0, 0,400,490, 'bg');		//在game.world中坐标(0,0)处画出预加载游戏资源，背景图片
  this.bg.autoScroll(-25,0);
    this.bo = this.game.add.tileSprite(0, this.world.centerY+150, 395, 135, 'bo');
  //this.bo = this.game.add.sprite(0, 132, 'bo');		//也是背景图片，我的背景由两个背景透明的图片组合而成，其实可以合二为一
    this.bo.autoScroll(-25, 0);
  // this.menu = this.game.add.sprite(0, 0, 'menu');		//加载menu图片
  this.logo = this.game.add.sprite(50, 50, 'menus','menu_03');

  this.bird = this.game.add.sprite(x - 30, y - 60, 'bird');		//载入即将闯荡管子世界的Bird

  var text = this.game.add.text(x, y - 118, "Press space to start!", style);		//定义显示文本变量,并在game.world显示，参数(坐标,显示文本,文本风格)
  text.anchor.setTo(0.5, 0.5);		//
    this.game.add.button(this.world.centerX - 165, this.world.centerY + 60, "play", this.start, this);
    this.game.add.button(this.world.centerX + 25, this.world.centerY + 60, "ranking_list", this.ranking, this);

}

start() {
  this.game.state.start('play');		//调用start()函数后进入'ready'state
}

ranking(){
  this.game.state.start('ranking');
}

}