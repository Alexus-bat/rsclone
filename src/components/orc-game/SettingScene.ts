export default class SettingScene extends Phaser.Scene {
    private menu?: Phaser.GameObjects.Text
    private setting?: Phaser.GameObjects.Text
    private score?: Phaser.GameObjects.Text
    private about?: Phaser.GameObjects.Text
    private CONFIG?: Phaser.Core.Config | any
    private soundSetting!: Phaser.GameObjects.Text
    private isSound!: boolean

    constructor() {
        super({key: 'SettingScene', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.config;
    }

    create() {
        this.isSound = true
        // Game title
        this.add.text(150, 50, 'ORC LIFE MATTER', {font: '36px LifeCraft', color: '#FF0000'}).setShadow(2, 2, '#FFFF00');
        this.add.text(150, 100, 'Setting', {font: '36px LifeCraft', color: '#FF0000'}).setShadow(2, 2, '#FFFF00');
        // Click to play text
        this.menu = this.add.text(100, 200, 'Back to menu', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        // create mouse input
        this.menu.on('pointerup', this.goMenu, this);
        this.add.text(100, 300, 'Sound:', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000')
        this.soundSetting= this.add.text(200, 300, 'on', {font: '24px LifeCraft', color: '#FF0000'}).setShadow(2, 2, '#FFFF00').setInteractive()
        this.soundSetting.on('pointerup', this.changeSetting, this)
    }

    changeSetting() {
        this.isSound = !this.isSound;

        this.isSound ? this.soundSetting.setText('on') : this.soundSetting.setText('off')
    }

    goMenu() {
        this.scene.start('Menu', {isSound: this.isSound})
    }
}
