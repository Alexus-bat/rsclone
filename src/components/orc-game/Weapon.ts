import helper from "../helper/helper.ts";

interface DataInterface {
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined,
    damage: number,
    timer: number,
}

export default class Weapon extends Phaser.Physics.Matter.Sprite {
    private damage: number;
    private timer: number;
    private nameAnim: string

    constructor(data: DataInterface) {
        const {scene, gameId, x, y, name, texture, frame, damage, timer, nameAnim, fullName} = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
        this.name = name;
        this.damage = damage;
        this.timer = timer;
        this.nameAnim = nameAnim;
        this.gameId = gameId;
        this.fullName = fullName;

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        const weaponCollider = Bodies.circle(this.x, this.y, 15, {isSensor: false, label: 'weaponCollider'});
        const weaponSensor = Bodies.circle(this.x, this.y, 25, {isSensor: true, label: 'weaponSensor'});
        const compoundBody = Body.create({
            parts: [weaponCollider, weaponSensor],
            frictionAir: 0.35,
        });

        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

    }
}
