const { defInput } = require('./input.js');

function parts(input) {
    const banks = input.slice();
    const statesVisited1 = {};
    const statesVisited2 = {};
    let cycles = 0;

    /* eslint-disable no-constant-condition */
    while (true) {
        cycles += 1;
        let largeValue = Number.NEGATIVE_INFINITY;
        let largeIndex = -1;

        for (let i = 0; i < banks.length; i += 1) {
            const bank = banks[i];
            if (bank > largeValue) {
                largeValue = bank;
                largeIndex = i;
            }
        }

        banks[largeIndex] = 0;
        for (let j = 1; j <= largeValue; j += 1) {
            banks[(largeIndex + j) % banks.length] += 1;
        }

        const hash = banks.join(',');
        if (statesVisited1[hash]) {
            return { part1: cycles, part2: cycles - statesVisited2[hash] };
        }
        statesVisited1[hash] = true;
        statesVisited2[hash] = cycles;
    }
}

function test(input = defInput) {
    const parsed = input.split(/\t/g).map(Number);

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
