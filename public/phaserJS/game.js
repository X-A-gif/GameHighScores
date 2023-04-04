var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('background', 'assets/invadersbg.png');
}

function create ()
{
  var background = this.add.image(game.config.width / 2, game.config.height / 2, 'background');
  background.setOrigin(0.5, 0.5);
}

function update ()
{
}