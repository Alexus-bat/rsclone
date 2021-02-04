import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import LoadScene from './LoadScene.ts';
import Menu from './Menu.ts';
import LevelScene from './LevelScene.ts';
import MainScene from './MainScene.ts';
import PauseScene from './PauseScene.ts'
import DieScene from './DieScene.ts'
import ScoreScene from './ScoreScene.ts'

const config = {
    width: window.innerWidth / 2,
    height: window.innerHeight / 2,
    resolution: window.devicePixelRatio,
    backgroundColor: '0xF4CCA1',
    type: Phaser.AUTO,
    parent: 'canvas',
    scene: [LoadScene, Menu, LevelScene, MainScene, PauseScene, DieScene, ScoreScene],
    scale: {
        zoom: 2,
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {y: 0},
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}


export default function start(): Phaser.Game {
    new Phaser.Game(config);
}
