const deltas = [[1, 0], [0, -1], [-1, 0], [0, 1]]; // Counter-clockwise: right, up, left, down

module.exports = (input) => {
    const square = Number(input);

    const maxSize = Math.trunc(Math.log10(square) / 2 + 4);
    const grid = Array.from(Array(2 * maxSize)).map(() => Array(2 * maxSize).fill(0));
    let x = maxSize;
    let y = maxSize;
    grid[x][y] = 1;

    let dir = 0;
    let nDir = 1;
    let [dx, dy] = deltas[dir];
    let [ndx, ndy] = deltas[nDir];

    let highest = 0;
    while (highest <= square) {
        highest += grid[x][y];
        x += dx;
        y += dy;

        // Add and subtract values from relevant positions only
        for (let i = -1; i <= 1; i += 1) {
            highest += grid[x + dx + dy * i][y + dy + dx * i];
            highest -= grid[x - dx - dx + dy * i][y - dy - dy + dx * i];
        }

        grid[x][y] = highest;

        // Adjust position deltas when a corner is detected
        if (grid[x + ndx][y + ndy] === 0) {
            dir = nDir;
            nDir = (dir + 1) % 4;
            [dx, dy] = deltas[dir];
            [ndx, ndy] = deltas[nDir];
        }
    }

    return highest;
};
