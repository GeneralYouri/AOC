const { Grid } = require('../library.js');

module.exports = (input, steps = 100) => {
    const grid = new Grid(input.charLines().map(line => line.map(Number)));

    let flashes = 0;
    const flashQueue = [];
    const tick = (cell) => {
        cell.value += 1;
        if (cell.value >= 10) {
            flashes += 1;
            cell.value = 0;
            flashQueue.push(cell);
        }
    };

    for (let i = 0; i < steps; i += 1) {
        for (const cell of grid) {
            tick(cell);
        }

        while (flashQueue.length > 0) {
            const cell = flashQueue.pop();
            for (const nextCell of grid.neighbours8(cell)) {
                if (nextCell.value !== 0) {
                    tick(nextCell);
                }
            }
        }
    }
    return flashes;
};
