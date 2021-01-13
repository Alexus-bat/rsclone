import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import MainScene from './MainScene.ts';

const config = {
    width: 512,
    height: 512,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent: 'canvas',
    scene: [MainScene],
    scale: {
        zoom: 2,
    },
    physics: {
        default: 'matter',
        matter: {
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
