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
let enemies;
let ship;
let bullets;
let enemyBullets;
let score = 0;
let scoreText; 


function preload() {
  this.load.image('background', 'assets/invadersbg.png');
  this.load.image('ship', 'assets/spaceShips_001.png');
  this.load.image('bullet', 'assets/bullet.png');
  this.load.image('invader', 'assets/invader1.png');
}

function create() {
  let background = this.add.image(game.config.width / 2, game.config.height / 2, 'background');
  background.setOrigin(0.5, 0.5);

  createShip.call(this);
  createEnemies.call(this);
  createEnemyBullets.call(this);

  scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#FFF' });

}

function createShip() {
  this.ship = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'ship');
  this.ship.setScale(0.5, -0.5);
  this.ship.setOrigin(0.5, 1);
  this.ship.setCollideWorldBounds(true);

  let cursors = this.input.keyboard.createCursorKeys();

  cursors.left.on('down', () => {
    this.ship.setVelocityX(-200);
  });
  cursors.right.on('down', () => {
    this.ship.setVelocityX(200);
  });
  cursors.left.on('up', () => {
    this.ship.setVelocityX(0);
  });
  cursors.right.on('up', () => {
    this.ship.setVelocityX(0);
  });

  createBullets.call(this);

  let spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  spacebar.on('down', fireBullet, this);
}

function createBullets() {
  this.bullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 100
  });
}

function createEnemyBullets() {
  this.enemyBullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 100
  });
}


function fireBullet() {
  let bullet = this.bullets.get(this.ship.x, this.ship.y - this.ship.height / 2);
  if (bullet) {
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.setScale(0.5); 
    bullet.setVelocityY(-400);
    this.time.addEvent({
      delay: 1000,
      callback: function() {
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.setVelocity(0, 0);
      },
      callbackScope: this
    });
  }
}

function createEnemies() {
  enemies = this.physics.add.group(); 
  enemyBullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 100
  });

  const formationWidth = 10;
  const formationHeight = 4;
  const startX = (game.config.width - formationWidth * 50) / 2;
  const startY = 50;

  for (let i = 0; i < formationWidth * formationHeight; i++) {
    const x = startX + (i % formationWidth) * 50;
    const y = startY + Math.floor(i / formationWidth) * 50;

    let enemy = enemies.create(x, y, 'invader');
    enemy.setScale(0.3);
    enemy.setCollideWorldBounds(true);

    let bulletTimer;

    this.time.addEvent({
      delay: Phaser.Math.Between(5000, 50000),
      loop: true,
      callback: function() {
        if (bulletTimer && bulletTimer.getProgress() < 1) {
          return;
        }

        if (enemy.active) { 
          let bullet = enemyBullets.get(enemy.x, enemy.y + enemy.height / 2);

          if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setScale(0.5); 
            bullet.setVelocityY(25);

            bulletTimer = this.time.addEvent({
              delay: Phaser.Math.Between(10000, 20000),
              callback: function() {
                bullet.setActive(false);
                bullet.setVisible(false);
                bullet.setVelocity(0, 0);
              },
              callbackScope: this
            });
          }
        }
      },
      callbackScope: this
    });
  }
}

let scoreWritten = false


function update() {
  this.physics.add.collider(this.bullets, enemies, function(bullet, enemy) {
      enemy.disableBody(true, true); 
      score += 10; 
      scoreText.setText('Score: ' + score); 
  });

  if (score >= 400 && !scoreWritten) {
    gameOver(score);
    scoreWritten = true;
  }
}

const gameOver = async (score) => {
  const response = await fetch (`/api/users/user`, {
      method: 'PUT',
      body: JSON.stringify({ score: score }),
      headers: {
          'Content-Type' : 'application/json',
      },
  })

  if(response.ok) {
      console.log("wooohoooo");
  }

  else {
      console.log("darn");
  }
}

// console.log('Game Over');
// fetch('/api/user', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ score: score })
// })
// .then(response => {
//   res.json(response)

// })
// .catch(error => {
// });