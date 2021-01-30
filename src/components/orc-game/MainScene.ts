import Player from './Player.ts';
import Enemy from './Enemy.ts';
import helper from '../helper/helper.ts';
import {createPlayerAnims} from './PlayerAnims.ts';
import Panel from "../panel/panel.ts";
import Health from "./Health.ts";
import Weapon from "./Weapon.ts";
import weapons from "../weapons/weapon-config.ts";
import enemies from "../enemies/enemies-config.ts";


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
        this.enemyAmount = 6;
        this.maxEnemyAmount = 50;
        this.enemies = [];
        this.misteryWeapon = null;
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
                        this.enemyAttackHandler(currentEnemy, currentEnemy.damage);
                    }

                    if (currentEnemy.player.inputKeys.attack.isDown && !currentEnemy.player.isDead) {
                        this.playerAttackHandler(currentEnemy, currentEnemy.player.damage);
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

        this.matterCollision.addOnCollideEnd({
            objectA: this.player,
            objectB: this.healthUnit,
            callback: (obj) => {
                if (obj.gameObjectB !== null && obj.gameObjectB.texture !== undefined && obj.gameObjectB.texture.key === 'health') {
                        this.player.health += this.healthUnit.healthValue;
                        this.healthUnit.destroy();
                        if (this.player.health > 100) {
                            this.player.health = 100;
                        }
                }
            },
        })

        this.matterCollision.addOnCollideEnd({
            objectA: this.player,
            objectB: this.misteryWeapon,
            callback: (obj) => {
                if (obj.gameObjectB !== null && obj.gameObjectB.gameId && obj.gameObjectB.gameId === 'weapon') {
                    this.player.weaponName = this.misteryWeapon.name;
                    this.player.weaponFullName = this.misteryWeapon.fullName;
                    this.misteryWeapon.destroy();
                    this.player.weapon.destroy();
                    this.player.damage += this.misteryWeapon.damage;
                    this.player.weaponAttackAnim = this.misteryWeapon.nameAnim;
                    this.player.weapon = this.player.scene.add.sprite(this.x + 10, this.y + 10, this.misteryWeapon.name, this.misteryWeapon.frame);
                    this.backToStockWeapon(this.misteryWeapon.timer, this.misteryWeapon.damage);
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
                new Enemy(enemies(this)[helper.getRandomNumber(0, enemies(this).length - 1)]));
        }
        this.createEnemies(8000);
        this.createHealth(40000, 15000);
        this.createMisteryWeapon(30000);
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
    createEnemies(delayOfCreate) {
        setInterval(() => {
            if (this.enemies.length <= this.maxEnemyAmount) {
                            this.enemies.push(
                                new Enemy(enemies(this)[helper.getRandomNumber(0, enemies(this).length - 1)]));
                            this.collisionHandler();
                        } else {
                            return
                        }
        },delayOfCreate)
    }

    createMisteryWeapon(delayOfCreate) {
        setInterval(() => {
            if (!this.misteryWeapon) {
                this.misteryWeapon = new Weapon(weapons(this)[0]);
                this.collisionHandler();
            } else {
                return
            }
            console.log(this.misteryWeapon);
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
        }, 400)
        if (this.player.health <= 0) {
            this.player.health = 0;
        } else {
            enemy.player.tint = 0xff0000;
        }
    }

    playerAttackHandler(player: any, health: number) {
        setTimeout(() => {
            player.clearTint();
        }, 2000)
        player.wasAttacked = true;
        player.health -= health
        player.tint = 0xff0000;
    }

    backToStockWeapon(delay: number, increaseDamage: number) {
        setTimeout(() => {
            this.player.weapon.destroy();
            this.player.weaponName = 'sword';
            this.player.weaponFullName = 'sword';
            this.player.damage -= increaseDamage;
            this.player.weaponAttackAnim = 'attack-sword';
            this.player.weapon.destroy();
            this.player.weapon = this.player.scene.add.sprite(this.x + 10, this.y + 10, 'sword', 'sword-anim-1');
            this.misteryWeapon = null;
        }, delay)
    }

    update() {
        this.player?.update();
        this.panel.updatePlayerHealth(this.player);
        this.panel.updatePlayerWeapon(this.player);
        this.enemies.forEach((it, index) => {
            if (it.isDead) {
                this.enemies.splice(index, 1)
            }
        })
    }
}
