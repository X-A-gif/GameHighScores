var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade'
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};


let game = new Phaser.Game(config);

function preload ()
{
  this.load.image('background', 'assets/invadersbg.png');
  this.load.image('ship', 'assets/spaceShips_001.png');
}

let ship;

function create ()
{
  let background = this.add.image(game.config.width / 2, game.config.height / 2, 'background');
  background.setOrigin(0.5, 0.5);

  ship = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'ship');
  ship.setScale(0.5, -0.5);
  ship.setOrigin(0.5, 1);
  
  ship.setCollideWorldBounds(true);

  let cursors = this.input.keyboard.createCursorKeys();

  cursors.left.on('down', function() {
    ship.setVelocityX(-200);
  });
  cursors.right.on('down', function() {
    ship.setVelocityX(200);
  });
  cursors.left.on('up', function() {
    ship.setVelocityX(0);
  });
  cursors.right.on('up', function() {
    ship.setVelocityX(0);
  });

}

function update ()
{
}