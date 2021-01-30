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
                frame: 'weapons-axe-1',
                damage: 2,
                timer: 20000,
                nameAnim: 'attack-axe',
                fullName: 'Axe of vengeance',
            }
        ]
    )
}

export default weapons
