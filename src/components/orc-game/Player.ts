interface DataInterface {
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
}

export default class Player extends Phaser.Physics.Matter.Sprite {
    private inputKeys: any
    private weapon: any
    private physics: any

    constructor(data: DataInterface) {
        const {scene, x, y, texture, frame} = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

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
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

        this.play(frame, true);
    }

    static preload(scene: Phaser.Scene) {
        scene.load.spritesheet('orc', '../assets/img/orc.png', {frameWidth: 64, frameHeight: 64});
        scene.load.image('sword', '../assets/img/attack-icon.png');
        scene.load.atlas('sword_anim', '../assets/img/sword_anim.png', '../assets/img/sword_anim_atlas.json');
        scene.load.animation('sword-anim_anim', '../assets/img/sword_anim_anim.json');
    }

    update() {
        const speed = 5;
        const playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys?.left.isDown) {
            this.anims.play('walkLeft', true);
            playerVelocity.x = -1;
            this.weapon.x = (this.x - 19);
            this.weapon.y = (this.y + 10);
            this.weapon.angle = -140;
        } else if (this.inputKeys?.right.isDown) {
            this.anims.play('walkRight', true);
            playerVelocity.x = 1;
            this.weapon.x = (this.x + 16);
            this.weapon.y = (this.y + 10);
            this.weapon.angle = 0;
        }
        if (this.inputKeys?.up.isDown) {
            this.anims.play('walkUp', true);
            playerVelocity.y = -1;
            this.weapon.x = (this.x + 14);
            this.weapon.y = (this.y + 10);
            this.weapon.angle = 0;
        } else if (this.inputKeys?.down.isDown) {
            this.anims.play('walkDown', true);
            playerVelocity.y = 1;
            this.weapon.x = (this.x - 14);
            this.weapon.y = (this.y + 12);
            this.weapon.angle = -90;
        }

        if (this.inputKeys?.attack.isDown) {
            switch(this.anims.currentAnim.key) {
                case 'walkUp':
                    this.anims.play('attackUp', true);
                    this.weapon.anims.play({key: 'attack-sword', repeat: 1, end: 1});
                    break;
                case 'walkLeft':
                    this.anims.play('attackLeft', true);
                    this.weapon.anims.play({key: 'attack-sword', repeat: 1, end: 1});
                    break;
                case 'walkDown':
                    this.anims.play('attackDown', true);
                    this.weapon.anims.play({key: 'attack-sword', repeat: 1, end: 1});
                    break;
                case 'walkRight':
                    this.anims.play('attackRight', true);
                    this.weapon.anims.play({key: 'attack-sword', repeat: 1, end: 1});
                    break;
            }

        }

        if (!this.anims.currentAnim.key.match(/attack/)) {
            if (this.inputKeys?.left.isUp && this.inputKeys.right.isUp && this.inputKeys.up.isUp && this.inputKeys.down.isUp) this.anims.stop();
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y)
    }
}
