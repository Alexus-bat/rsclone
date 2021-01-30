import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import LoadScene from './LoadScene.ts';
import Menu from './Menu.ts';
import LevelScene from './LevelScene.ts';
import MainScene from './MainScene.ts';

const config = {
    width: 512,
    height: 512,
    backgroundColor: '0xF4CCA1',
    type: Phaser.AUTO,
    parent: 'canvas',
    scene: [LoadScene, Menu, LevelScene, MainScene],
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
    return new Phaser.Game(config);
}
