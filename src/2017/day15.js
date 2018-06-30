const { defInput } = require('./input15.js');

function duel(startX, startY, modX, modY, iterations) {
    let x = startX;
    let y = startY;
    let count = 0;

    for (let i = 0; i < iterations; i += 1) {
        do {
            x = (x * 16807) % 2147483647;
        } while (x % modX !== 0);

        do {
            y = (y * 48271) % 2147483647;
        } while (y % modY !== 0);

        if (x % 65536 === y % 65536) {
            count += 1;
        }
    }

    return count;
}

function parts(input) {
    const part1 = duel(...input, 1, 1, 40000000);
    const part2 = duel(...input, 4, 8, 5000000);

    return { part1, part2 };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(value => value.replace(/\D/g, '')).map(Number);

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
