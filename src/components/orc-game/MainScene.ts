import Player from './Player.ts';
import Enemy from './Enemy.ts';
import helper from '../helper/helper.ts';
import {createPlayerAnims} from './PlayerAnims.ts';
import Panel from "../panel/panel.ts";
import Health from "./Health.ts";


export default class Main extends Phaser.Scene {
    private player?: Phaser.Physics.Matter.Sprite | any
    private enemy?: Phaser.Physics.Matter.Sprite | any
    private healthUnit?: Phaser.Physics.Matter.Sprite | any
    private enemyAmount: number;
    private maxEnemyAmount: number;
    private enemies: any;
    private panel: any;
    attackSound?: Phaser.Sound.BaseSound;
    walkSound?: Phaser.Sound.BaseSound;
    timedEvent?: Phaser.Time.TimerEvent;

    constructor() {
        super('MainScene');
        this.enemyAmount = 2;
        this.maxEnemyAmount = 50;
        this.enemies = [];
    }

    preload() {
        Player.preload(this);
        Enemy.preload(this);
        Health.preload(this);
        this.load.image('tiles', '../assets/img/RPGNature.png');
        this.load.tilemapTiledJSON('map', '../assets/img/map.json');
        this.load.audio('sound_walk', ['../assets/img/walk.wav']);
        this.load.audio('sound_attack', ['../assets/img/attack.wav']);
    }

    collisionHandler() {
        this.matterCollision.addOnCollideActive({
            objectA: this.player,
            objectB: this.enemies,
            callback: (obj: any) => {
                const enemyId = obj.gameObjectB.body.id;
                const currentEnemy = this.enemies.find((it: any) => it.body.id === enemyId);
                if (currentEnemy) {
                    if (!currentEnemy.isDead) {
                        this.enemyAttackHandler(currentEnemy, 0.2);
                    }

                    if (currentEnemy.player.inputKeys.attack.isDown && !currentEnemy.player.isDead) {
                        this.playerAttackHandler(currentEnemy, 5);
                    }
                }
            },
        });

        this.matterCollision.addOnCollideStart({
            objectA: this.enemies,

            callback: (obj: any) => {
                const enemyId = obj.gameObjectA.body.id;
                const currentEnemy = this.enemies.find((it: any) => it.body.id === enemyId);
                if (currentEnemy)
                    currentEnemy.changeDirection();
            },
        })

        this.matterCollision.addOnCollideStart({
            objectA: this.healthUnit,
            callback: (obj: any) => {
                if (this.healthUnit !== undefined)
                    this.healthUnit.changeDirection();
            },
        })

        this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: this.healthUnit,
            callback: (obj) => {
                if (obj.gameObjectB !== 0 && obj.gameObjectB.texture !== null && obj.gameObjectB.texture.key === 'health') {
                        this.player.health += this.healthUnit.healthValue;
                        if (this.player.health > 100) {
                            this.player.health = 100;
                        }
                        this.healthUnit.destroy();
                }
            },
        })
    }

    create() {
        this.panel = new Panel('panel');
        const map = this.make.tilemap({key: 'map'});
        const tiles = map.addTilesetImage('RPGNature', 'tiles', 32, 32, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1', tiles, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2', tiles, 0, 0);
        layer1.setCollisionByProperty({collides: true});
        this.matter.world.convertTilemapLayer(layer1);
        this.walkSound = this.sound.add('sound_walk');
        this.attackSound = this.sound.add('sound_attack');

        createPlayerAnims(this.anims);

        this.player = new Player({
            scene: this,
            x: 100,
            y: 100,
            texture: 'orc',
            frame: 'walkRight'
        });

        for (let i = 0; i < this.enemyAmount; i += 1) {
            this.enemies.push(
                new Enemy({
                    scene: this,
                    x: helper.getRandomNumber(100, 412),
                    y: helper.getRandomNumber(100, 412),
                    texture: 'enemy-troll',
                    frame: 'troll_idle_1',
                }));
        }
        this.createHealth(40000, 15000);

        this.createEnemy('enemy-troll', 'troll_idle_1', 5000);

        this.collisionHandler();

        this.cameras.main.startFollow(this.player);

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE
        })
    }

    createEnemy(texture: string, frame: string, delayOfCreate) {
        setInterval(() => {
            if (this.enemies.length <= this.maxEnemyAmount) {
                this.enemies.push(
                    new Enemy({
                        scene: this,
                        x: helper.getRandomNumber(100, 412),
                        y: helper.getRandomNumber(0, 412),
                        texture: texture,
                        frame: frame,
                    }));
                this.collisionHandler();
            } else {
                return
            }
        }, delayOfCreate);
    }

    createHealth(delay: number, timeOfLife: number): void {
         setInterval(() => {
                this.healthUnit = new Health({
                    scene: this,
                    x: helper.getRandomNumber(100, 412),
                    y: helper.getRandomNumber(100, 412),
                    label: 'health',
                    texture: 'health',
                    frame: 'health_idle_1'
                });
                this.collisionHandler();
                setTimeout(() => this.healthUnit.destroy(), timeOfLife)
            }
        , delay);
    }

    enemyAttackHandler(enemy: any, health: number) {
        enemy.switchMode();
        enemy.player = this.player;
        setTimeout(() => {
            enemy.player.health -= health;
            enemy.player.clearTint();
        }, 500)
        if (this.player.health <= 0) {
            this.player.health = 0;
        }
        enemy.player.tint = 0xff0000;
    }

    playerAttackHandler(player: any, health: number) {
        setTimeout(() => {
            player.clearTint();
        }, 2000)
        player.wasAttacked = true;
        player.health -= health
        player.tint = 0xff0000;
    }

    update() {
        this.player?.update();
        this.panel.updatePlayerHealth(this.player);
        this.enemies.forEach((it, index) => {
            if (it.isDead) {
                this.enemies.splice(index, 1)
            }
        })
    }
}
