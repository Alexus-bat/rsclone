export default class PauseScene extends Phaser.Scene {
    private player?: Phaser.Physics.Matter.Sprite | any
    private enemies?: any;
    private health?: number
    private resumeBtn!: Phaser.GameObjects.Text
    private menuBtn!: Phaser.GameObjects.Text
    private saveBtn!: Phaser.GameObjects.Text
    private text_saving!: Phaser.GameObjects.Text
    private CONFIG?: Phaser.Core.Config | any
    private veil!: Phaser.GameObjects.Graphics
    private main!: Phaser.Scene

    constructor() {
        super({key: 'PauseScene', active: false});
    }

    init({player, enemies, health, main}) {
        this.CONFIG = this.sys.game.config;
        this.player = player;
        this.enemies = enemies;
        this.health = health;
        this.main = main
        // console.log(this.player)
        // console.log(this.enemies)
        // console.log(this.health)
    }

    create() {
        this.veil = this.add.graphics({ x: 0, y: 0});
        this.veil.fillStyle(0x000000, 0.8);
        this.veil.fillRect(0, 0, this.CONFIG.width, this.CONFIG.height);
        
        this.resumeBtn = this.add.text(this.CONFIG.width / 2, this.CONFIG.height / 4, 'Resume', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        this.resumeBtn.on('pointerup', this.offPause, this);

        this.saveBtn = this.add.text(this.CONFIG.width / 2, this.CONFIG.height / 2, 'Save game', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        this.saveBtn.on('pointerup', this.saving, this);

        this.menuBtn = this.add.text(this.CONFIG.width / 2, this.CONFIG.height * 3 / 4, 'Main menu', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        this.menuBtn.on('pointerup', this.toMenu, this);
    }

    offPause() {
        this.scene.resume('MainScene');
        this.scene.stop();
    }

    saving() {
        this.text_saving = this.add.text(10, 10, 'The game has been saved', {font: '24px LifeCraft', color: '#FF0000'}).setShadow(1, 1, '#FFFF00', 1);
        setTimeout(() => {
            this.text_saving.destroy()
        }, 2000)
    }

    toMenu() {
        this.scene.stop('MainScene');
        this.scene.start('Menu');
    }
}
