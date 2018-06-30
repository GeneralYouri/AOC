const { defInput } = require('./input3.js');

function part1(square) {
    const index = Math.ceil((Math.sqrt(square) + 1) / 2) - 1;
    const edge = index * 2 + 1;

    return index + Math.abs(index + ((square - edge * edge) % (edge - 1)));
}

function part2(square) {
    const grid = { 0: { 0: 1 } };
    let x = 0;
    let y = 0;
    let dx = 1;
    let dy = 0;
    let i = 1;
    let ii = 0;

    /* eslint-disable no-constant-condition */
    while (true) {
        x += dx;
        y += dy;

        let sum = 0;
        for (let xx = -1; xx <= 1; xx += 1) {
            for (let yy = -1; yy <= 1; yy += 1) {
                if (grid[x + xx] && grid[x + xx][y + yy]) {
                    sum += grid[x + xx][y + yy];
                }
            }
        }

        if (sum > square) {
            return sum;
        }

        if (!grid[x]) {
            grid[x] = {};
        }
        grid[x][y] = sum;

        ii += 1;
        if (ii >= i) {
            ii = 0;
            if (i % 2 === 1) {
                if (dx === 1) {
                    dx = 0;
                    dy = -1;
                } else {
                    dx = -1;
                    dy = 0;
                    i += 1;
                }
            } else if (dx === -1) {
                dx = 0;
                dy = 1;
            } else {
                dx = 1;
                dy = 0;
                i += 1;
            }
        }
    }
}

function test(input = defInput) {
    console.log('Part 1 answer', part1(input));
    console.log('Part 2 answer', part2(input));
}

exports.part1 = part1;
exports.part2 = part2;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
