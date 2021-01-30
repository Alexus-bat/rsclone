interface DataInterface {
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
}

export default class Player extends Phaser.Physics.Matter.Sprite {
    private inputKeys: any;
    private weapon: any;
    private health: number;
    private isDead: boolean;
    private attacking: boolean;
    private damage: number;

    constructor(data: DataInterface) {
        const {scene, x, y, texture, frame} = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
        this.health = 100;
        this.damage = 5;
        this.isDead = false;
        this.attacking = false;
        this.weaponAttackAnim = 'attack-sword';
        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        const playerCollider = Bodies.circle(this.x, this.y, 12, {isSensor: false, label: 'playerCollider'});
        const playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor: true, label: 'playerSensor'});
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.weapon = this.scene.add.sprite(this.x + 10, this.y + 10, 'sword', 'sword-anim-1');
        this.weapon.setScale(0.8);
        this.weapon.setSize(12, 8);
        this.weaponName = 'sword';
        this.weaponFullName = 'sword'
        this.scene.add.existing(this.weapon);
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
        this.play(frame, true);
    }

    update() {
        if (this.health <= 0) {
           this.die();
           return
        }
        this.body.isSleeping = true;
        const speed = 5;
        const playerVelocity = new Phaser.Math.Vector2();
        if (!this.isDead) {
            if (this.inputKeys?.left.isDown) {
                this.body.isSleeping = false;
                this.anims.play('walkLeft', true);
                this.playSound(this.scene.walkSound);
                playerVelocity.x = -1;
                this.weapon.x = (this.x - 19);
                this.weapon.y = (this.y + 10);
                this.weapon.setFlip(true, false);
            } else if (this.inputKeys?.right.isDown) {
                this.body.isSleeping = false;
                this.anims.play('walkRight', true);
                this.playSound(this.scene.walkSound);
                playerVelocity.x = 1;
                this.weapon.x = (this.x + 16);
                this.weapon.y = (this.y + 10);
                this.weapon.resetFlip();
            }
            if (this.inputKeys?.up.isDown) {
                this.body.isSleeping = false;
                this.anims.play('walkUp', true);
                this.playSound(this.scene.walkSound);
                playerVelocity.y = -1;
                this.weapon.x = (this.x - 14);
                this.weapon.y = (this.y + 10);
                this.weapon.setFlip(true, false);
            } else if (this.inputKeys?.down.isDown) {
                this.body.isSleeping = false;
                this.anims.play('walkDown', true);
                this.playSound(this.scene.walkSound);
                playerVelocity.y = 1;
                this.weapon.x = (this.x - 19);
                this.weapon.y = (this.y + 10);
                this.weapon.setFlip(true, false);
            }
        }

        if (this.inputKeys?.attack.isDown && !this.isDead) {
            const direction = this.anims.currentAnim.key;
            if (direction.match(/Up/)) {
                this.anims.play('attackUp', true);
                this.weapon.anims.play({key: this.weaponAttackAnim, repeat: 1, end: 1});
                this.playSound(this.scene.attackSound);
            } else if (direction.match(/Left/)) {
                this.anims.play('attackLeft', true);
                this.weapon.anims.play({key: this.weaponAttackAnim, repeat: 1, end: 1});
                this.playSound(this.scene.attackSound);
            } else if (direction.match(/Down/)) {
                this.anims.play('attackDown', true);
                this.weapon.anims.play({key: this.weaponAttackAnim, repeat: 1, end: 1});
                this.playSound(this.scene.attackSound);
            } else if (direction.match(/Right/)) {
                this.anims.play('attackRight', true);
                this.weapon.anims.play({key: this.weaponAttackAnim, repeat: 1, end: 1});
                this.playSound(this.scene.attackSound);
            }
        }

        if (!this.anims.currentAnim.key.match(/attack/)) {
            if (this.inputKeys?.left.isUp && this.inputKeys.right.isUp && this.inputKeys.up.isUp && this.inputKeys.down.isUp)
                this.anims.stop();
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
    }

    die() {
        this.body.isSleeping = true;
        this.isDead = true;
        this.play('player-dead', true);
    }

    playSound(sound) {
        sound.play();
    }
}
