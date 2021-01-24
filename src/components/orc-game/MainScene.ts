/* eslint-disable */
import Player from './Player.ts';
import Enemy from './Enemy.ts';
import helper from '../helper/helper.ts';
import { createPlayerAnims } from './PlayerAnims.ts';

export default class Main extends Phaser.Scene {
    private player?: Phaser.Physics.Matter.Sprite | any
    private enemy?: Phaser.Physics.Matter.Sprite | any
    private enemyAmount: number;
    attackSound?: Phaser.Sound.BaseSound;
    walkSound?: Phaser.Sound.BaseSound;
    timedEvent?: Phaser.Time.TimerEvent;

    constructor() {
        super('MainScene');
        this.enemyAmount = 5;
    }

    preload() {
        Player.preload(this);
        Enemy.preload(this);
        this.load.image('tiles', '../assets/img/RPGNature.png');
        this.load.tilemapTiledJSON('map', '../assets/img/map.json');
        this.load.audio('sound_walk', ['../assets/img/walk.wav']);
        this.load.audio('sound_attack', ['../assets/img/attack.wav']);
    }

    create() {
        const map = this.make.tilemap({key: 'map'});
        const tiles = map.addTilesetImage('RPGNature', 'tiles', 32, 32, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1', tiles, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2', tiles, 0, 0);
        layer1.setCollisionByProperty({collides: true});
        this.matter.world.convertTilemapLayer(layer1);

        this.walkSound = this.sound.add('sound_walk');
        this.attackSound = this.sound.add('sound_attack');

        createPlayerAnims(this.anims);

        this.player = new Player({scene: this, x: 100, y: 100, texture: 'orc', frame: 'walkRight'});
        for (let i = 0; i < this.enemyAmount; i += 1) {
          this.enemy = new Enemy({scene: this, x: helper.getRandomNumber(100, 412), y: helper.getRandomNumber(0, 412), texture: 'enemy-troll', frame: 'troll_idle_1'});
          this.enemy?.update()
          this.timedEvent = this.time.addEvent({
            delay: helper.getRandomNumber(500, 1000),
            callback: this.enemy.move,
            callbackScope: this.enemy,
            loop: true
          });

        }

        // this.player.setScale(0.5)
        this.cameras.main.startFollow(this.player);
        // const player2 = new Player({scene: this, x: 200, y: 200, texture: 'orc', frame: 'walkDown'});

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
