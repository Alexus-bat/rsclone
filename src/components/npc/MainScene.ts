/* eslint-disable */
export default class Main extends Phaser.Scene {

  private player?: Phaser.Physics.Matter.Sprite
  private inputKeys?: object

  constructor() {
      super('MainScene');
  }

  preload() {
      this.load.spritesheet('skeleton', '../assets/img/skeleton.png', {frameWidth: 22, frameHeight: 33});
      this.load.image('tiles', '../assets/img/RPGNature.png');
      this.load.tilemapTiledJSON('map', '../assets/img/map.json');
  }

  create() {
      const map = this.make.tilemap({key: 'map'});
      const tiles = map.addTilesetImage('RPGNature', 'tiles', 32, 32, 0, 0);
      const layer1 = map.createLayer('Tile Layer 1', tiles, 0, 0);
      const layer2 = map.createLayer('Tile Layer 2', tiles, 0, 0);
      layer1.setCollisionByProperty({collides: true});
      this.matter.world.convertTilemapLayer(layer1);

      this.player = this.matter.add.sprite(100, 100, 'skeleton');

      const M = Phaser.Physics.Matter.Matter;
      const w = this.player.width;
      const h = this.player.height;

      const sx = w / 2;
      const sy = h / 2;

      const playerCollider = M.Bodies.circle(sx, sy + 10, 20, {isSensor: false, label: 'playerCollider'});
      const playerSensor = M.Bodies.circle(sx, sy, 24, {isSensor: true, label: 'playerSensor'});
      const compoundBody = M.Body.create({
          parts: [playerCollider, playerSensor],
          frictionAir: 0.35,
      });

      this.player.setExistingBody(compoundBody);
      this.player.setFixedRotation()

      this.anims.create({
          key: 'walkUp',
          frames: this.anims.generateFrameNumbers('skeleton', { frames: [193, 194, 195, 196, 197, 198, 199, 200]}),
          frameRate: 20,
          repeat: -1
      }),

      this.anims.create({
          key: 'walkLeft',
          frames: this.anims.generateFrameNumbers('skeleton', { frames: [216, 217, 218, 219, 220, 221, 222, 223, 224]}),
          frameRate: 20,
          repeat: -1
      }),

      this.anims.create({
          key: 'walkDown',
          frames: this.anims.generateFrameNumbers('skeleton', { frames: [241, 242, 243, 244, 245, 246, 247, 248]}),
          frameRate: 20,
          repeat: -1
      }),

      this.anims.create({
          key: 'walkRight',
          frames: this.anims.generateFrameNumbers('skeleton', { frames: [264, 265, 266, 267, 268, 269, 270, 271, 272]}),
          frameRate: 20,
          repeat: -1
      })

      this.inputKeys = this.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W,
          down: Phaser.Input.Keyboard.KeyCodes.S,
          left: Phaser.Input.Keyboard.KeyCodes.A,
          right: Phaser.Input.Keyboard.KeyCodes.D,
      })
  }

  update() {
      const speed = 5;
      const playerVelocity = new Phaser.Math.Vector2();
      if (this.inputKeys?.left.isDown) {
          this.player?.anims.play('walkLeft', true);
          playerVelocity.x = -1;
      } else if (this.inputKeys?.right.isDown) {
          this.player?.anims.play('walkRight', true);
          playerVelocity.x = 1;
      }
      if (this.inputKeys?.up.isDown) {
          this.player?.anims.play('walkUp', true);
          playerVelocity.y = -1;
      } else if (this.inputKeys?.down.isDown) {
          this.player?.anims.play('walkDown', true);
          playerVelocity.y = 1;
      }
      if (this.inputKeys?.left.isUp && this.inputKeys.right.isUp && this.inputKeys.up.isUp && this.inputKeys.down.isUp) this.player.anims.isPlaying = false;
      playerVelocity.normalize();
      playerVelocity.scale(speed);
      this.player?.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
