import helper from "../helper/helper.ts";

const levelConfig =
    [
        {
            id: 'easy',
            enemyRespawnDelay: 8000,
            healthRespawnDelay: 30000,
            weaponRespawnDelay: 20000,
            startEnemiesAmount: 5,
            maxEnemiesAmount: 50,
            layout: '', // if we have different map's:)
        },
        {
            id: 'medium',
            enemyRespawnDelay: 6000,
            healthRespawnDelay: 40000,
            weaponRespawnDelay: 30000,
            startEnemiesAmount: 10,
            maxEnemiesAmount: 50,
            layout: '', // if we have different map's:)
        },
        {
            id: 'night-mare',
            enemyRespawnDelay: 4000,
            healthRespawnDelay: 35000,
            weaponRespawnDelay: 40000,
            startEnemiesAmount: 15,
            maxEnemiesAmount: 80,
            layout: '', // if we have different map's:)
        }
    ];


export default levelConfig
