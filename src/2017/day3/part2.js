const dirs = ['right', 'up', 'left', 'down'];
const deltas = [[1, 0], [0, -1], [-1, 0], [0, 1]];

module.exports = (input) => {
    const square = Number(input);

    const grid = { 0: { 0: 1 } };
    let x = 0;
    let y = 0;

    let dir = 0;
    let nDir = 1;
    let [dx, dy] = deltas[dir];
    let [ndx, ndy] = deltas[nDir];

    // Get the grid value for given position, defaults to 0 for grid positions that don't have a value yet
    const tryGet = (getX, getY) => grid[getX] && grid[getX][getY] || 0;

    let highest = 0;
    while (highest <= square) {
        highest += grid[x][y];
        x += dx;
        y += dy;

        // Add and subtract values from relevant positions only
        for (let i = -1; i <= 1; i += 1) {
            highest += tryGet(x + dx + dy * i, y + dy + dx * i);
            highest -= tryGet(x - dx - dx + dy * i, y - dy - dy + dx * i);
        }

        if (!grid[x]) {
            grid[x] = {};
        }
        grid[x][y] = highest;

        // Adjust position deltas when a corner is detected
        if (!grid[x + ndx] || !grid[x + ndx][y + ndy]) {
            dir = nDir;
            nDir = (dir + 1) % 4;
            [dx, dy] = deltas[dir];
            [ndx, ndy] = deltas[nDir];
        }
    }

    return highest;
};
