import Phaser from 'libs/phaser-wx.js'
import PIXI from 'libs/pixi-wx.js'
import BootState from 'states/BootState.js'
import BaseState from 'states/BaseState.js'
import PreloadState from 'states/PreloadState.js'
import MenuState from 'states/MenuState.js'
import PlayState from 'states/PlayState.js'
import GameOverState from 'states/GameOverState.js'
import RankingState from 'states/RankingState.js'

// 保存原始的canvas
wx.originContext = canvas.getContext('2d');

var game = new Phaser.Game({
  width: 375,
  height: 667,
  renderer: Phaser.CANVAS,
  canvas: canvas
});
wx.clearStorage();
game.state.add('boot', new BootState(game));
game.state.add('preload', new PreloadState(game));
game.state.add('ranking', new RankingState(game));
game.state.add('menu', new MenuState(game));
game.state.add('play', new PlayState(game));
game.state.add('gameover', new GameOverState(game));

game.state.start('boot');
