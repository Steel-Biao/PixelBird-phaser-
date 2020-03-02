import Phaser from '../libs/phaser-wx.js';
import BaseState from './BaseState.js';
export default class GameOverState extends Phaser.State {


  constructor(game) {
    super();
    this.game = game;
    this.score = 0;  
    console.log('!');  
  }

  create(){
    var openDataContext = wx.getOpenDataContext();
  this.score = wx.getStorageSync('fraction');
    openDataContext.postMessage({
      action: 'save',
      data: {
        gameAspect: [this.game.width, this.game.height],
        score: this.score
      },
    });
    wx.clearStorageSync();
  console.log('这是结束操作');
  var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  space_key.onDown.add(this.start, this);

  var style = { font: "20px Arial", fill: "#F00" };
  var style1 = { font: "30px Arial", fill: "F00" };
    var x = this.game.world.width / 2, y = this.game.world.height / 2;

  this.bg = this.game.add.sprite(0, 0, 'bg');
    this.bo = this.game.add.sprite(0, this.world.centerY + 150, 'bo');
  this.gameover = this.game.add.sprite(0, 0, 'gameover');

  if (this.score > 0) {
    var score_label = this.game.add.text(x-80 , y-95 , this.score, style1);
    score_label.anchor.setTo(0.5, 0.5);
    // var score_label1 = this.game.add.text(x + 90, y + 20, "Unknown!", style);
    // score_label1.anchor.setTo(0.5, 0.5);
  }else if (this.score == 0) {
    var score_label = this.game.add.text(x - 80, y - 95, "0", style1);
    score_label.anchor.setTo(0.5, 0.5);
    // var score_label1 = this.game.add.text(x + 90, y + 20, "Unknown!", style);
    // score_label1.anchor.setTo(0.5, 0.5);
  }
    this.game.add.button(this.world.centerX - 147, this.world.centerY-10, "play", this.start, this);
    this.game.add.button(this.world.centerX + 32, this.world.centerY - 10, "ranking_list", this.ranking, this);
}
start() {
  this.game.state.start('play');
}
  ranking() {
    this.game.state.start('ranking');
  }
}