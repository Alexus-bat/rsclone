interface DataInterface {
    scene: Phaser.Scene,
    gameId: string,
    x: number,
    y: number,
    name: string,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined,
    damage: number,
    timer: number,
    nameAnim: string,
    fullName: string,
}

export default class Weapon extends Phaser.Physics.Matter.Sprite {
    private damage: number;
    private timer: number;
    private nameAnim: string;
    private gameId: string;
    private fullName: string;

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
}
