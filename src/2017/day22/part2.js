// TODO:
// Potentially rework to unify the solutions, by abstracting the differences
// Accept an array of possible states, defined by their state transition functions
// Basically just an abstract state machine
// X Will probably be too slow

// Clockwise: up, right, down, left
//             0  1  2  3
// const dx = [0, 1, 0, -1];
// const dy = [-1, 0, 1, 0];

// 400 is sufficient for my input while 450 seems sufficient for other inputs
const size = 500;

// Result bounds: x in [-199, 191], y in [-161, 166]
module.exports = (input) => {
    const lines = input.split(/\n/g);
    const inputSize = lines.length;
    const inputOffset = Math.trunc(inputSize / 2);

    const grid = Array.from(Array(size)).map(() => Array.from(Array(size)).fill(1));
    let x = size / 2;
    let y = size / 2;

    for (let i = 0; i < inputSize; i += 1) {
        const line = lines[i];
        for (let j = 0; j < line.length; j += 1) {
            if (line[j] === '#') {
                grid[i + y][j + x] = 3;
            }
        }
    }

    x += inputOffset;
    y += inputOffset;
    let dir = 0;

    let infections = 0;
    for (let i = 0; i < 10000000; i += 1) {
        if (!grid[y]) {
            grid[y] = [];
        }
        const row = grid[y];

        if (!row[x]) {
            row[x] = 1;
        }
        const cell = row[x];

        if (cell === 2) {
            infections += 1;
        }

        row[x] = cell % 4 + 1;
        dir = (dir + cell + 2) % 4;
        x += (2 - dir) % 2;
        y += (dir - 1) % 2;
    }

    return infections;
};
