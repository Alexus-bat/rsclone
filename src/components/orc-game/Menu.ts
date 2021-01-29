export default class Menu extends Phaser.Scene {
    private play?: Phaser.GameObjects.Text
    private CONFIG?: Phaser.Core.Config | any

    constructor() {
        super({key: 'Menu', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.config;
    }

    create() {
        // Game title
        this.add.text(100, 100, 'ORC LIFE MATTER')
        this.add.text(100, 150, 'MAIN MENU')
        // Click to play text
        this.play = this.add.text(100, 200, 'Play').setInteractive();
        // create mouse input
        // this.createMouseInput();
        this.play.on('pointerup', this.goPLay, this)

    }

    createMouseInput() {
        this.input.on('pointerup', this.goPLay, this);
    }

    goPLay() {
        this.scene.start('MainScene')
    }
}
