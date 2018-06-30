const { defInput } = require('./input5.js');

function part1(input) {
    const offsets = input.slice();
    let i = 0;
    let steps = 0;

    for (; i >= 0 && i < offsets.length; steps += 1) {
        const offset = offsets[i];
        offsets[i] += 1;
        i += offset;
    }

    return steps;
}

function part2(input) {
    const offsets = input.slice();
    let i = 0;
    let steps = 0;

    for (; i >= 0 && i < offsets.length; steps += 1) {
        const offset = offsets[i];
        if (offset >= 3) {
            offsets[i] -= 1;
        } else {
            offsets[i] += 1;
        }
        i += offset;
    }

    return steps;
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(Number);

    console.log('Part 1 answer', part1(parsed));
    console.log('Part 2 answer', part2(parsed));
}

exports.part1 = part1;
exports.part2 = part2;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
