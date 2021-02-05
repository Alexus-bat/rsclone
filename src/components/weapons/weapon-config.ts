import helper from "../helper/helper.ts";

const weapons = (scene) => {
    return ([
            {
                scene: scene,
                gameId: 'weapon',
                x: helper.getRandomNumber(100, 412),
                y: helper.getRandomNumber(100, 412),
                name: 'axe',
                texture: 'axe',
                frame: 'weapon-axe-1',
                damage: 2,
                timer: 20000,
                nameAnim: 'attack-axe',
                fullName: 'Axe of vengeance',
            },
            {
                scene: scene,
                gameId: 'weapon',
                x: helper.getRandomNumber(100, 412),
                y: helper.getRandomNumber(100, 412),
                name: 'scythe',
                texture: 'scythe',
                frame: 'weapons-scythe-1',
                damage: 4,
                timer: 15000,
                nameAnim: 'attack-scythe',
                fullName: 'Sea of Damage',
            },

        ]
    )
}

export default weapons
