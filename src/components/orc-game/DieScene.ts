export default class DieScene extends Phaser.Scene {
    private restartBtn!: Phaser.GameObjects.Text
    private menuBtn!: Phaser.GameObjects.Text
    private text_lost!: Phaser.GameObjects.Text
    private veil!: Phaser.GameObjects.Graphics
    private CONFIG?: Phaser.Core.Config | any

    constructor() {
        super({key: 'DieScene', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.config;
    }

    create() {
        this.veil = this.add.graphics({ x: 0, y: 0});
        this.veil.fillStyle(0x000000, 0.8);
        this.veil.fillRect(0, 0, this.CONFIG.width, this.CONFIG.height);
        
        this.restartBtn = this.add.text(this.CONFIG.width / 2, this.CONFIG.height / 3, 'Restart', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        this.restartBtn.on('pointerup', this.toRestart, this);

        this.menuBtn = this.add.text(this.CONFIG.width / 2, this.CONFIG.height * 2 / 3, 'Main menu', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        this.menuBtn.on('pointerup', this.toMenu, this);

        this.text_lost = this.add.text(10, 10, 'YOU DIED', {font: '24px LifeCraft', color: '#FF0000'}).setShadow(1, 1, '#FFFF00', 1);
    }

    toRestart() {
        // this.scene.restart();
        this.scene.stop();
        this.scene.start('MainScene')
    }

    toMenu() {
        this.scene.stop('MainScene');
        this.scene.start('Menu');
    }
}
