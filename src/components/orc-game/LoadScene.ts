// import MainScene from './MainScene.ts';
// import Menu from './Menu.ts';
// import Text from './Text.ts';

export default class Load extends Phaser.Scene {
    private progress?: Phaser.GameObjects.Graphics
    private title?: Phaser.GameObjects.Text
    private txt_progress?: Phaser.GameObjects.Text
    private CONFIG?: Phaser.Core.Config | any

    constructor() {
        super({key: 'LoadScene', active: false})
    }

    init() {
        this.CONFIG = this.sys.game.config;
    }

    preload() {
        // this.load.bitmapFont('LifeCraft', '../assets/fonts/lifecraft.xml', '../assets/fonts/lifecraft.ttf');
        // Create loading bar
        this.createLoadingBar();
        // files
        // MainScene
        this.load.image('tiles', '../assets/img/RPGNature.png');
        this.load.tilemapTiledJSON('map', '../assets/img/map.json');
        this.load.audio('sound_walk', ['../assets/img/walk.wav']);
        this.load.audio('sound_attack', ['../assets/img/attack.wav']);
        // Player
        this.load.spritesheet('orc', '../assets/img/orc.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('sword', '../assets/img/attack-icon.png');
        this.load.atlas('sword_anim', '../assets/img/sword_anim.png', '../assets/img/sword_anim_atlas.json');
        this.load.animation('sword-anim_anim', '../assets/img/sword_anim_anim.json');

        this.load.atlas('player-dead', '../assets/img/player-dead.png', `../../assets/img/player-dead_atlas.json`);
        this.load.animation('player-dead_anim', '../assets/img/player-dead_anim.json');
        // Enemy
        this.load.atlas('enemy-troll', '../assets/img/enemy-troll.png', `../../assets/img/enemy-troll_atlas.json`);
        this.load.atlas('enemy-troll-attack', '../assets/img/enemy-troll-attack.png', `../../assets/img/enemy-troll-attack_atlas.json`);
        this.load.atlas('enemy-troll-dead', '../assets/img/enemy-troll-dead.png', `../../assets/img/enemy-troll-dead_atlas.json`);
        this.load.atlas('executor', '../assets/img/executor.png', `../../assets/img/executor_atlas.json`);
        this.load.atlas('golem', '../assets/img/golem.png', `../../assets/img/golem_atlas.json`);

        this.load.animation('golem-attack', '../assets/img/golem_anim.json');
        this.load.animation('golem-dead', '../assets/img/golem_anim.json');
        this.load.animation('golem-idle', '../assets/img/golem_anim.json');
        this.load.animation('golem-walk', '../assets/img/golem_anim.json');

        this.load.animation('executioner-attack', '../assets/img/executor_anim.json');
        this.load.animation('executioner-dead', '../assets/img/executor_anim.json');
        this.load.animation('executioner-idle', '../assets/img/executor_anim.json');
        this.load.animation('executioner-walk', '../assets/img/executor_anim.json');

        this.load.animation('enemy-troll-attack_anim', '../assets/img/enemy-troll-attack_anim.json');
        this.load.animation('enemy-troll-dead_anim', '../assets/img/enemy-troll-dead_anim.json');
        this.load.animation('enemy-troll_anim', '../assets/img/enemy-troll_anim.json');
        // Health
        this.load.atlas('health', '../assets/img/health.png', `../../assets/img/health_atlas.json`);
        this.load.animation('health_anim', '../assets/img/health_anim.json');
    }

    create() {
        // Go menu
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.scene.start('Menu') },
            callbackScope: this
        })
    }

    createLoadingBar() {
        // Title
        // this.title = new Text(
        //     this,
        //     this.CONFIG.centerX,
        //     75,
        //     'Loading Game',
        //     'preload',
        //     0.5
        // );
        // // Progress text
        // this.txt_progress = new Text(
        //     this,
        //     this.CONFIG.centerX,
        //     this.CONFIG.centerY - 5,
        //     'Loading...',
        //     'preload',
        //     {x: 0.5, y: 1}
        // );

        // this.title = this.add.bitmapText(100, 100, 'LifeCraft', 'Loading Game', 75,)

        this.title = this.add.text(100, 100, 'Game loading');

        this.txt_progress = this.add.text(100, 200, 'Loading...')
        // Progress bar
        const x = 10;
        const y = Math.round(0.5 * this.CONFIG.height) + 5;
        this.width = this.CONFIG.width - 2 * x;
        this.height = 18;
        this.progress = this.add.graphics({x: x, y: y})
        this.load.on('progress', this.onProgress, this);
    }

    onProgress(value) {
        // Width of progress bar
        this.progress?.clear();
        this.progress?.fillStyle('0xFFFFFF', 1);
        this.progress?.fillRect(0, 0, this.width * value, this.height)
        // Percentage in progress bar
        const perc = `${Math.round(value * 100)}%`
        this.txt_progress?.setText(perc);
    }
}
