export default class Menu extends Phaser.Scene {
    private play?: Phaser.GameObjects.Text
    private setting?: Phaser.GameObjects.Text
    private score?: Phaser.GameObjects.Text
    private about?: Phaser.GameObjects.Text
    private CONFIG?: Phaser.Core.Config | any

    constructor() {
        super({key: 'Menu', active: false});
    }

    init() {
        this.CONFIG = this.sys.game.config;
    }

    create() {
        this.cameras.main.setBackgroundColor('#808080')
        // Game title
        this.add.text(150, 50, 'ORC LIFE MATTER', {font: '36px LifeCraft', color: '#FF0000'}).setShadow(2, 2, '#FFFF00');
        this.add.text(150, 100, 'MAIN MENU', {font: '36px LifeCraft', color: '#FF0000'}).setShadow(2, 2, '#FFFF00');
        // Click to play text
        this.play = this.add.text(100, 200, 'Single play', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        this.score = this.add.text(100, 250, 'Score', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        this.setting = this.add.text(100, 300, 'Setting', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        this.about = this.add.text(100, 350, 'About game', {font: '24px LifeCraft', color: '#FFFF00'}).setShadow(2, 2, '#FF0000').setInteractive();
        // create mouse input
        this.play.on('pointerup', this.goPLay, this);
        this.about.on('pointerup', this.goAbout, this);
        this.score.on('pointerup', this.toScore, this)
    }

    goPLay() {
        this.scene.start('LevelScene')
    }

    toScore() {
        this.scene.start('ScoreScene');
    }

    goAbout() {
        document.querySelector('.header')!.style.opacity = '1';
        document.querySelector('.header')!.style.visibility = 'visible';
        document.querySelector('.footer')!.style.opacity = '1';
        document.querySelector('.footer')!.style.visibility = 'visible';

        this.sys.game.destroy(true);
    }
}
