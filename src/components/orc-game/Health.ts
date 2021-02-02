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

export default class Health extends Phaser.Physics.Matter.Sprite {
    private direction: any;
    private speed: number;
    private moveEvent: Phaser.Time.TimerEvent;
    private healthValue: number

    constructor(data: DataInterface) {
        const {scene, x, y, texture, frame} = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
        this.healthValue = helper.getRandomNumber(5, 15);
        this.speed = 4;
        this.direction = Direction.RIGHT;
        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        const healthCollider = Bodies.circle(this.x, this.y, 15, {isSensor: false, label: 'healthCollider'});
        const healthSensor = Bodies.circle(this.x, this.y, 25, {isSensor: true, label: 'healthSensor'});
        const compoundBody = Body.create({
            parts: [healthCollider, healthSensor],
            frictionAir: 0.35,
        });

        this.moveEvent = scene.time.addEvent({
            delay: helper.getRandomNumber(1000, 3000),
            callback: () => {
                this.direction = helper.randomDirection(this.direction)
            },
            loop: true
        });

        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    get velocity() {
        return this.body.velocity;
    }

    walk(direction): void {
        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('health_idle', true);
        } else {
            this.anims.play('health_idle', true);
        }
        this.speed = helper.getRandomNumber(4, 7);
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
        this.direction = helper.randomDirection(this.direction)
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this.walk(this.direction);
        this.anims.play('health_idle', true);
    }
}
