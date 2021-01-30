import helper from "../helper/helper.ts";

const enemies = (scene) => {
    return ([
            {
                scene: scene,
                x: helper.getRandomNumber(100, 412),
                y: helper.getRandomNumber(100, 412),
                texture: 'enemy-troll',
                frame: 'troll_idle_1',
                damage: 0.2,
                stayAnim: 'enemy-troll_idle',
                walkAnim: 'enemy-troll_walk',
                attackAnim: 'enemy-troll_attack',
                deadAnim: 'enemy-troll_dead',
                health: 100,
                speed: helper.getRandomNumber(1, 3),
            },
            {
                scene: scene,
                x: helper.getRandomNumber(100, 412),
                y: helper.getRandomNumber(100, 412),
                texture: 'executor',
                frame: 'executioner_walk_1',
                damage: 0.4,
                stayAnim: 'executioner-idle',
                walkAnim: 'executioner-walk',
                attackAnim: 'executioner-attack',
                deadAnim: 'executioner-dead',
                health: 120,
                speed: helper.getRandomNumber(3, 5),
            },
            {
                scene: scene,
                x: helper.getRandomNumber(100, 412),
                y: helper.getRandomNumber(100, 412),
                texture: 'golem',
                frame: 'golem_idle_1',
                damage: 1,
                stayAnim: 'golem-idle',
                walkAnim: 'golem-walk',
                attackAnim: 'golem-attack',
                deadAnim: 'golem-dead',
                health: 200,
                speed: helper.getRandomNumber(1, 2),
            },
        ]
    )
}

export default enemies
