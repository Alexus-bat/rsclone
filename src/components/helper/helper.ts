enum Direction {
    UP,
    Down,
    LEFT,
    RIGHT
}

const helper = {
    getRandomNumber: function (min: number, max: number) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
    randomDirection: function (exclude: Direction) {
        let newDirection = Phaser.Math.Between(0, 3)
        while (newDirection === exclude) {
            newDirection = Phaser.Math.Between(0, 3)
        }

        return newDirection
    },
};

export default helper;
