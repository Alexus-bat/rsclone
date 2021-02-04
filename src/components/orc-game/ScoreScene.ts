export default class ScoreScene extends Phaser.Scene {
    private menu?: Phaser.GameObjects.Text
    private setting?: Phaser.GameObjects.Text
    private score?: Phaser.GameObjects.Text
    private about?: Phaser.GameObjects.Text
    private CONFIG?: Phaser.Core.Config | any

    constructor() {
        super({key: 'ScoreScene', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.config;
    }

    create() {
        // Game title
        this.add.text(150, 50, 'ORC LIFE MATTER', {font: '36px LifeCraft', color: '#FF0000'}).setShadow(2, 2, '#FFFF00');
        this.add.text(150, 100, 'Score stats', {font: '36px LifeCraft', color: '#FF0000'}).setShadow(2, 2, '#FFFF00');
        // Click to play text
        this.menu = this.add.text(100, 200, 'Back to menu', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        // create mouse input
        this.menu.on('pointerup', this.goMenu, this);
    }

    goMenu() {
        this.scene.start('Menu')
    }
}
