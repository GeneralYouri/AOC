const { Grid } = require('../library.js');

module.exports = (input) => {
    const grid = new Grid(input.charLines().map(line => line.map(Number)));
    const lowPoints = Array.from(grid).filter(cell => grid.neighbours4(cell).every(neighbour => cell.value < neighbour.value));
    return lowPoints.map(cell => cell.value + 1).sum();
};
