interface DataInterface {
    scene: Phaser.Scene, 
    x: number, 
    y: number, 
    texture: string | Phaser.Textures.Texture, 
    frame?: string | number | undefined
}

export default class Player extends Phaser.Physics.Matter.Sprite {
    private inputKeys: any

    constructor(data: DataInterface) {
        let {scene, x, y, texture, frame} = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 12, {isSensor: false, label: 'playerCollider'});
        let playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor: true, label: 'playerSensor'});
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

        this.play(frame, true)
    }

    static preload(scene: Phaser.Scene) {
        scene.load.spritesheet('orc', '../assets/img/orc.png', {frameWidth: 64, frameHeight: 64});        
    }

    update() {
        const speed = 5;
        const playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys?.left.isDown) {
            this.anims.play('walkLeft', true);
            playerVelocity.x = -1;
        } else if (this.inputKeys?.right.isDown) {
            this.anims.play('walkRight', true);
            playerVelocity.x = 1;
        }
        if (this.inputKeys?.up.isDown) {
            this.anims.play('walkUp', true);
            playerVelocity.y = -1;
        } else if (this.inputKeys?.down.isDown) {
            this.anims.play('walkDown', true);
            playerVelocity.y = 1;
        }
        
        if (this.inputKeys?.attack.isDown) {
            switch(this.anims.currentAnim.key) {
                case 'walkUp': this.anims.play('attackUp', true);
                    break;
                case 'walkLeft': this.anims.play('attackLeft', true);
                    break;
                case 'walkDown': this.anims.play('attackDown', true);
                    break;
                case 'walkRight': this.anims.play('attackRight', true);
                    break;
            }
            
        }

        if (!this.anims.currentAnim.key.match(/attack/)) {
            if (this.inputKeys?.left.isUp && this.inputKeys.right.isUp && this.inputKeys.up.isUp && this.inputKeys.down.isUp) this.anims.stop();
        }

        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
    }
}
