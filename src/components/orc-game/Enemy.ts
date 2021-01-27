import helper from "../helper/helper.ts";

interface DataInterface {
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined,
}

enum Direction {
    UP,
    Down,
    LEFT,
    RIGHT
}

const randomDirection = (exclude: Direction) => {
    let newDirection = Phaser.Math.Between(0, 3)
    while (newDirection === exclude) {
        newDirection = Phaser.Math.Between(0, 3)
    }

    return newDirection
}

export default class Enemy extends Phaser.Physics.Matter.Sprite {
    private direction: any;
    private speed: number;
    private moveEvent: Phaser.Time.TimerEvent;
    private isAttacking: boolean;
    private wasAttacked: boolean;
    private isDead: boolean;
    private health: number;
    private player: any;

    constructor(data: DataInterface) {
        const {scene, x, y, texture, frame} = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
        this.isAttacking = false;
        this.isDead = false;
        this.wasAttacked = false;
        this.direction = Direction.RIGHT;
        this.health = 100;
        this.player = null;

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        const enemyCollider = Bodies.circle(this.x, this.y, 15, {isSensor: false, label: 'enemyCollider'});
        const enemySensor = Bodies.circle(this.x, this.y, 25, {isSensor: true, label: 'enemySensor'});
        const compoundBody = Body.create({
            parts: [enemyCollider, enemySensor],
            frictionAir: 0.35,
        });

        this.moveEvent = scene.time.addEvent({
            delay: helper.getRandomNumber(1000, 3000),
            callback: () => {
                this.direction = randomDirection(this.direction)
            },
            loop: true
        });

        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene: Phaser.Scene) {
        scene.load.atlas('enemy-troll', '../assets/img/enemy-troll.png', `../../assets/img/enemy-troll_atlas.json`);
        scene.load.atlas('enemy-troll-attack', '../assets/img/enemy-troll-attack.png', `../../assets/img/enemy-troll-attack_atlas.json`);
        scene.load.atlas('enemy-troll-dead', '../assets/img/enemy-troll-dead.png', `../../assets/img/enemy-troll-dead_atlas.json`);

        scene.load.animation('enemy-troll-attack_anim', '../assets/img/enemy-troll-attack_anim.json');
        scene.load.animation('enemy-troll-dead_anim', '../assets/img/enemy-troll-dead_anim.json');
        scene.load.animation('enemy-troll_anim', '../assets/img/enemy-troll_anim.json');
    }

    get velocity() {
        return this.body.velocity
    }

    walk(direction): void {
        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('enemy-troll_walk', true);
        } else {
            this.anims.play('enemy-troll_idle', true);
        }
        this.speed = helper.getRandomNumber(1, 5);
        switch (direction) {
            case Direction.UP:
                this.setVelocity(0, -(this.speed));
                break
            case Direction.Down:
                this.setVelocity(0, this.speed);
                break
            case Direction.LEFT:
                this.setVelocity(-(this.speed), 0);
                this.setFlip(true, false);
                break
            case Direction.RIGHT:
                this.setVelocity(this.speed, 0)
                this.resetFlip();
                break
        }
    }

    changeDirection() {
        this.direction = randomDirection(this.direction)
    }

    bounce(offsetX: number, offsetY: number, obj): void {
        const dx = this.x - obj.x;
        const dy = this.y - obj.y;
        this.setVelocity(dx + offsetX, dy + offsetY);
        this.wasAttacked = !this.wasAttacked;
    }

    chase(): void {
        const dx = this.player.x - this.x;
        const dy = this.player.y - this.y;
        this.anims.play('enemy-troll_attack', true);
        if (Math.abs(dx) < 200 || Math.abs(dy) > 200) {
            this.speed = 1.5;
            this.setVelocity(Math.sign(dx) * this.speed, Math.sign(dy) * this.speed);
        } else {
            this.isAttacking = false;
        }
    }

    die(): void {
        this.body.isSleeping = true;
        this.isDead = true;
        this.anims.play('enemy-troll_dead', true);
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if (!this.isAttacking && !this.isDead) {
            this.walk(this.direction);
        } else if (this.wasAttacked && this.isAttacking && !this.isDead) {
            this.bounce(15, 15, this.player);
        } else if (this.health <= 0) {
            this.die();
        } else {
            this.chase();
        }
    }

    switchMode() {
        this.isAttacking = true;
    }
}
