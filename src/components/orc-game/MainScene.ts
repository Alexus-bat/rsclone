/* eslint-disable */
import Player from './Player.ts';

export default class Main extends Phaser.Scene {
    private player?: Phaser.Physics.Matter.Sprite | any

    constructor() {
        super('MainScene');
    }

    preload() {
        Player.preload(this);
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

        this.anims.create({
            key: 'walkUp',
            frames: this.anims.generateFrameNumbers('orc', { frames: [193, 194, 195, 196, 197, 198, 199, 200]}),
            frameRate: 20,
            repeat: -1
        }),

        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('orc', { frames: [216, 217, 218, 219, 220, 221, 222, 223, 224]}),
            frameRate: 20,
            repeat: -1
        }),

        this.anims.create({
            key: 'walkDown',
            frames: this.anims.generateFrameNumbers('orc', { frames: [241, 242, 243, 244, 245, 246, 247, 248]}),
            frameRate: 20,
            repeat: -1
        }),

        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('orc', { frames: [264, 265, 266, 267, 268, 269, 270, 271, 272]}),
            frameRate: 20,
            repeat: -1
        }),

        this.anims.create({
            key: 'attackUp',
            frames: this.anims.generateFrameNumbers('orc', { frames: [288, 289, 290, 291, 292, 293]}),
            frameRate: 20,
            repeat: 1
        }),

        this.anims.create({
            key: 'attackLeft',
            frames: this.anims.generateFrameNumbers('orc', { frames: [312, 313, 314, 315, 316, 317]}),
            frameRate: 20,
            repeat: 1
        }),

        this.anims.create({
            key: 'attackDown',
            frames: this.anims.generateFrameNumbers('orc', { frames: [336, 337, 338, 339, 340, 341]}),
            frameRate: 20,
            repeat: 1
        }),

        this.anims.create({
            key: 'attackRight',
            frames: this.anims.generateFrameNumbers('orc', { frames: [360, 361, 362, 363, 364, 365]}),
            frameRate: 20,
            repeat: 1
        })

        this.player = new Player({scene: this, x: 100, y: 100, texture: 'orc', frame: 'walkRight'});

        // this.player.setScale(0.5)
        // this.cameras.main.startFollow(this.player);
        const player2 = new Player({scene: this, x: 200, y: 200, texture: 'orc', frame: 'walkDown'});

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE
        })
    }

   update() {
       this.player?.update();
   }
}
