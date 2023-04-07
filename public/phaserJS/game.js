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
  this.load.image('bullet', 'assets/bullet.png');
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

  createBullets.call(this);

  // set up the spacebar input
  let spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  spacebar.on('down', fireBullet, this);

}

function createBullets() {
  bullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 5
  });
}

function fireBullet() {
  let bullet = bullets.get(ship.x, ship.y - ship.height / 2);
  if (bullet) {
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.setScale(0.5); 
    bullet.setVelocityY(-400);
    this.time.addEvent({
      delay: 2000,
      callback: function() {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.setVelocity(0, 0);
      },
      callbackScope: this
    });
  }
}

function update ()
{
}

let bullets;
