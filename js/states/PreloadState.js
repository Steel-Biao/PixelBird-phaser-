import Phaser from '../libs/phaser-wx.js';
import MenuJosn from '../config/json.js';

export default class PreloadState extends Phaser.State {

  constructor(game) {
    super();
    this.game = game;
  }

  preload() {
    this.game.load.image('bg', 'images/bg.png');
    this.game.load.image('bo', 'images/back.png');
    this.game.load.image('menu', 'images/menu_1.png');
    this.game.load.image('play', 'images/menu_11.png');
    this.game.load.image('restar', 'images/menu_07.png');
    this.game.load.image('ranking_list', 'images/menu_13.png');
    this.game.load.atlas('menus', 'images/menu.png','',MenuJosn, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.game.load.image('ready', 'images/ready.png');
    this.game.load.image('bird', 'images/bird.png');
    this.game.load.image('pipe', 'images/pipe.png');
    this.game.load.audio('jump', 'audio/jump.wav');
    this.game.load.audio('dead', 'audio/dead.wav');
    this.game.load.image('gameover', 'images/gameover.png');
  }

  create() {
    this.game.state.start('menu');
  }

}
