const { Grid } = require('../library.js');

module.exports = (input) => {
    const grid = new Grid(input.charLines().map(line => line.map(Number)));

    const basins = [];
    const floodFill = (cell, id) => {
        cell.visited = true;
        basins[id] += 1;
        for (const nextCell of grid.neighbours4(cell)) {
            if (!nextCell.visited && nextCell.value < 9) {
                floodFill(nextCell, id);
            }
        }
    };

    let basin = 0;
    for (const cell of grid) {
        if (cell.visited || cell.value === 9) {
            continue;
        }

        basins[basin] = 0;
        floodFill(cell, basin);
        basin += 1;
    }

    return basins.sort((a, b) => a - b).slice(-3).product();
};
