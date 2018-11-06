// TODO:
// Potentially rework to unify the solutions, by abstracting the differences
// Accept an array of possible states, defined by their state transition functions
// Basically just an abstract state machine

const { defInput } = require('./input.js');

// Clockwise: up, right, down, left
const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

function part1(input) {
    const grid = input.reduce((layer1, row, y) => {
        layer1[y] = row.reduce((layer2, item, x) => {
            layer2[x] = input[y][x] === '#';
            return layer2;
        }, {});
        return layer1;
    }, {});

    let x = Math.floor(input[0].length / 2);
    let y = Math.floor(input.length / 2);
    let dir = 0;

    let infections = 0;
    for (let iterations = 0; iterations < 10000; iterations += 1) {
        if (!(y in grid)) {
            grid[y] = {};
        }
        if (!(x in grid[y])) {
            grid[y][x] = false;
        }

        if (grid[y][x]) {
            dir = (dir + 1) % 4;
        } else {
            dir = (dir - 1 + 4) % 4;
            infections += 1;
        }

        grid[y][x] = !grid[y][x];

        x += dx[dir];
        y += dy[dir];
    }

    return infections;
}

function part2(input) {
    const grid1 = input.reduce((layer1, row, y) => {
        layer1[y] = row.reduce((layer2, item, x) => {
            layer2[x] = input[y][x] === '#';
            return layer2;
        }, {});
        return layer1;
    }, {});

    const grid2 = input.reduce((layer1, row, y) => {
        layer1[y] = row.reduce((layer2, item, x) => {
            layer2[x] = false;
            return layer2;
        }, {});
        return layer1;
    }, {});

    let x = Math.floor(input[0].length / 2);
    let y = Math.floor(input.length / 2);
    let dir = 0;

    let infections = 0;
    for (let iterations = 0; iterations < 10000000; iterations += 1) {
        if (!(y in grid1)) {
            grid1[y] = {};
            grid2[y] = {};
        }
        if (!(x in grid1[y])) {
            grid1[y][x] = false;
            grid2[y][x] = false;
        }

        if (!grid1[y][x] && !grid2[y][x]) {
            dir = (dir - 1 + 4) % 4;
            grid2[y][x] = true;
        } else if (!grid1[y][x] && grid2[y][x]) {
            infections += 1;
            grid1[y][x] = true;
            grid2[y][x] = false;
        } else if (grid1[y][x] && !grid2[y][x]) {
            dir = (dir + 1) % 4;
            grid2[y][x] = true;
        } else if (grid1[y][x] && grid2[y][x]) {
            dir = (dir + 2) % 4;
            grid1[y][x] = false;
            grid2[y][x] = false;
        }

        x += dx[dir];
        y += dy[dir];
    }

    return infections;
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(line => line.split(''));

    console.log('Part 1 answer', part1(parsed));
    console.log('Part 2 answer', part2(parsed));
}

exports.part1 = part1;
exports.part2 = part2;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
