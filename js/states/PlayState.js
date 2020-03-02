import Phaser from '../libs/phaser-wx.js'
export default class PlayState extends Phaser.State {


  constructor(game) {
    super();
    this.game = game;
    this.score = 0;
    console.log('#');  
  }

   create() {
  //载入所需资源
     this.physics.startSystem(Phaser.Physics.ARCADE);
  // this.bg = this.game.add.sprite(0, 0, 'bg');
     this.bg = this.game.add.tileSprite(0, 0, 400, 490, 'bg');		//在game.world中坐标(0,0)处画出预加载游戏资源，背景图片
     this.bg.autoScroll(-25, 0);
  this.bo = this.game.add.sprite(0, this.world.centerY+150, 'bo');
     this.game.physics.enable(this.bo, Phaser.Physics.ARCADE);
     this.bo.body.allowGravity = false;
     this.bo.body.immovable = true;
    //  this.game.physics.enable(this.bo, Phaser.Physics.BOX2D);
    //  this.bo.body.clearFixtures();
  //var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  //space_key.onDown.add(this.jump, this);
    
  this.pipes = this.game.add.group();
  this.pipes.enableBody = true;
  this.pipes.createMultiple(20, 'pipe');
     this.timer = this.game.time.events.loop(Phaser.Timer.SECOND*2, this.add_row_of_pipes, this);
  this.bird = this.game.add.sprite(100, 245, 'bird');
     this.game.physics.enable(this.bird,Phaser.Physics.ARCADE);
     this.bird.body.allowRotation = false;
     this.bird.body.collideWorldBounds = true;
  this.bird.body.gravity.y = 1000; 		//设置Bird重力属性,gravity
  this.bird.anchor.setTo(-2, 0.5);		//设置Bird重心
 this.bird.body.bounce.setTo(0.6, 0.1);
  // Not 'this.score', but just 'score'
  var style = { font: "30px Arial", fill: "#ffffff" };
  this.label_score = this.game.add.text(20, 20, "0", style);

  this.jump_sound = this.game.add.audio('jump');		//加载音效
  this.dead_sound = this.game.add.audio('dead');		//||
     this.game.input.onDown.add(this.jump, this);
}

 update() {
   console.log(this.bird.inWorld);
   if (this.bird.alive == false)
    this.restart_game();

  if (this.bird.angle < 20)
    this.bird.angle += 1;

   this.game.physics.arcade.overlap(this.bird, this.pipes, this.hit_pipe, null, this);
   this.game.physics.arcade.collide(this.bo, this.bird, this.hit_pipe, null, this);
}
//每次按下空格调用的函数
 jump() {
  if (this.bird.alive == false)
    return;

  this.bird.body.velocity.y = -350;
  this.game.add.tween(this.bird).to({ angle: -20 }, 50).start();
  this.jump_sound.play();
}
//撞管子
 hit_pipe() {
  if (this.bird.alive == false)
    return;

  this.bird.alive = false;
  this.game.time.events.remove(this.timer);
   this.bo.body.enable = false;
  this.pipes.forEachAlive(function (p) {
    p.body.velocity.x = 0;
  }, this);
  this.dead_sound.play();
}
//重新开始函数
 restart_game() {
  this.game.time.events.remove(this.timer);
   this.score = 0;
  this.game.state.start('gameover');
}

 add_one_pipe(x, y) {
  var pipe = this.pipes.getFirstDead();
  if(pipe)
  {
    pipe.reset(x, y);
    pipe.body.velocity.x = -200;
    pipe.outOfBoundsKill = true;
  }else{
    pipe = this.pipes.create(x, y, 'pipe');
    pipe.reset(x, y);
    pipe.body.velocity.x = -200;
    pipe.outOfBoundsKill = true;
  }
  
}

 add_row_of_pipes() {
  var hole = Math.floor(Math.random() * 5) + 1;
  for (var i = 0; i < 8; i++)
    if (i != hole && i != hole + 1)
      this.add_one_pipe(400, i * 61);
  console.log(this.score);
  this.score += 1;
   wx.setStorageSync('fraction',this.score);
   this.label_score.setText(this.score);
   console.log(this.goods_name);
}

}