const process = require('./process');

// TODO: Due to the rules, offsets will eventually get stuck between 2 and 3 - how can we optimize around this fact?
// TODO: Unrolling some of the logic with the below commented function somehow makes the index.js run faster, but the benchmark run slower.
module.exports = (input) => {
    const offsets = input.split(/\n/g).map(Number);

    const part1 = process(offsets.slice(), Number.POSITIVE_INFINITY);
    const part2 = process(offsets, 3);
    return [part1, part2];
};

// module.exports = (input) => {
//     const offsets1 = input.split(/\n/g).map(Number);
//     const offsets2 = offsets1.slice();
//
//     let part1 = 0;
//     for (let i = 0; i < offsets1.length;) {
//         const offset = offsets1[i];
//         offsets1[i] += 1;
//
//         i += offset;
//         part1 += 1;
//     }
//
//     let part2 = 0;
//     for (let i = 0; i < offsets2.length;) {
//         const offset = offsets2[i];
//         offsets2[i] += offset < 3 ? 1 : -1;
//
//         i += offset;
//         part2 += 1;
//     }
//
//     return [part1, part2];
// };
