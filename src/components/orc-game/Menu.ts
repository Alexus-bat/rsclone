export default class Menu extends Phaser.Scene {
    private play?: Phaser.GameObjects.Text
    private setting?: Phaser.GameObjects.Text
    private about?: Phaser.GameObjects.Text
    private CONFIG?: Phaser.Core.Config | any

    constructor() {
        super({key: 'Menu', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.config;
    }

    create() {
        // Game title
        this.add.text(150, 50, 'ORC LIFE MATTER')
        this.add.text(150, 100, 'MAIN MENU')
        // Click to play text
        this.play = this.add.text(100, 200, 'Single play').setInteractive();
        this.setting = this.add.text(100, 250, 'Setting').setInteractive();
        this.about = this.add.text(100, 300, 'About game').setInteractive();
        // create mouse input
        this.play.on('pointerup', this.goPLay, this);
        this.about.on('pointerup', this.goAbout, this);
    }

    goPLay() {
        this.scene.start('LevelScene')
    }

    goAbout() {
        document.querySelector('.header').style.opacity = '1';
        document.querySelector('.footer').style.opacity = '1';
        this.sys.game.destroy(true);
    }
}
