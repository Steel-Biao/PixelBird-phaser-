import Phaser from '../libs/phaser-wx.js';
export default class BootState extends Phaser.State {

  constructor(game) {
    super();
    this.game = game;
    const fenshu = 0;
    console.log('@');  
  }

  create() {
    // this is very important
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   
    // this.scale.parentIsWindow = true;
    // invalid sound lock
    this.game.sound.touchLocked = false;

    // this.game.scale.setUserScale(10,100);
    console.log(this.vvv);
    this.game.state.start('preload');
  }

}