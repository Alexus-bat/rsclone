import helper from "../helper/helper.ts";

interface DataInterface {
  scene: Phaser.Scene,
  x: number,
  y: number,
  texture: string | Phaser.Textures.Texture,
  frame?: string | number | undefined
}

export default class Enemy extends Phaser.Physics.Matter.Sprite {
  constructor(data: DataInterface) {
    const {scene, x, y, texture, frame} = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);

    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    const enemyCollider = Bodies.circle(this.x, this.y, 12, {isSensor: false, label: 'enemyCollider'});
    const enemySensor = Bodies.circle(this.x, this.y, 24, {isSensor: true, label: 'enemySensor'});
    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('enemy-troll', '../assets/img/enemy-troll.png', `../../assets/img/enemy-troll_atlas.json`);
    scene.load.animation('enemy-troll_anim', '../assets/img/enemy-troll_anim.json');
  }

  get velocity() {
    return this.body.velocity
  }

  move() {
    const randNumber = helper.getRandomNumber(1, 4);

    switch(randNumber) {
      case 1:
        this.setVelocityX(10);
        break;
      case 2:
        this.setVelocityX(-10);
        break;
      case 3:
        this.setVelocityY(10);
        break;
      case 4:
        this.setVelocityY(-10);
        break;
      default:
        this.setVelocityX(10);
    }

    setTimeout(() => {
      this.setVelocityX(0);
      this.setVelocityY(0);
    }, 500);
  }

  update() {
    const speed = 2.5;
    const enemyVelocity = new Phaser.Math.Vector2();

    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play('enemy-troll_walk', true);
    } else {
      this.anims.play('enemy-troll_idle', true);
    }

    enemyVelocity.normalize();
    enemyVelocity.scale(speed);
    this.setVelocity(enemyVelocity.x, enemyVelocity.y);
  }
}
