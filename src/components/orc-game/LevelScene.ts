export default class LevelScene extends Phaser.Scene {
    private level1?: Phaser.GameObjects.Text
    private level2?: Phaser.GameObjects.Text
    private level3?: Phaser.GameObjects.Text
    private loadGame?: Phaser.GameObjects.Text
    private menu?: Phaser.GameObjects.Text
    private CONFIG?: Phaser.Core.Config | any

    constructor() {
        super({key: 'LevelScene', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.config;
    }

    create() {
        // Game title
        this.add.text(150, 50, 'ORC LIFE MATTER')
        this.add.text(150, 100, 'Choose level')
        // Click to play text
        this.level1 = this.add.text(100, 200, 'Easy').setInteractive();
        this.level2 = this.add.text(100, 250, 'Medium').setInteractive();
        this.level3 = this.add.text(100, 300, 'Hard').setInteractive();
        this.loadGame = this.add.text(100, 350, 'Load saved game').setInteractive();
        this.menu = this.add.text(100, 400, 'Main menu').setInteractive();
        // create mouse input
        this.level1.on('pointerup', this.playLevel1, this)

        this.menu.on('pointerup', this.goMenu, this)

    }

    playLevel1() {
        this.scene.start('MainScene')
    }

    goMenu() {
        this.scene.start('Menu');
    }
}
