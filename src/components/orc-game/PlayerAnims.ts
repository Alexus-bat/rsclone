const createPlayerAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'walkUp',
        frames: anims.generateFrameNumbers('orc', { frames: [193, 194, 195, 196, 197, 198, 199, 200]}),
        frameRate: 20,
        repeat: -1
    }),

    anims.create({
        key: 'walkLeft',
        frames: anims.generateFrameNumbers('orc', { frames: [216, 217, 218, 219, 220, 221, 222, 223, 224]}),
        frameRate: 20,
        repeat: -1
    }),

    anims.create({
        key: 'walkDown',
        frames: anims.generateFrameNumbers('orc', { frames: [241, 242, 243, 244, 245, 246, 247, 248]}),
        frameRate: 20,
        repeat: -1
    }),

    anims.create({
        key: 'walkRight',
        frames: anims.generateFrameNumbers('orc', { frames: [264, 265, 266, 267, 268, 269, 270, 271, 272]}),
        frameRate: 20,
        repeat: -1
    }),

    anims.create({
        key: 'attackUp',
        frames: anims.generateFrameNumbers('orc', { frames: [288, 289, 290, 291, 292, 293, 288]}),
        frameRate: 20,
        repeat: 1
    }),

    anims.create({
        key: 'attackLeft',
        frames: anims.generateFrameNumbers('orc', { frames: [312, 313, 314, 315, 316, 317, 312]}),
        frameRate: 20,
        repeat: 1
    }),

    anims.create({
        key: 'attackDown',
        frames: anims.generateFrameNumbers('orc', { frames: [336, 337, 338, 339, 340, 341, 336]}),
        frameRate: 20,
        repeat: 1
    }),

    anims.create({
        key: 'attackRight',
        frames: anims.generateFrameNumbers('orc', { frames: [360, 361, 362, 363, 364, 365, 360]}),
        frameRate: 20,
        repeat: 1
    })
}

export { createPlayerAnims }
