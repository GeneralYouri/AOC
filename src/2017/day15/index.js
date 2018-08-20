const { readFileSync } = require('fs');
const part1 = require('./part1');
const part2 = require('./part2');

const defaultInput = readFileSync(require.resolve('./input.txt'), { encoding: 'UTF-8' });

module.exports = { part1, part2, defaultInput };

if (module === require.main) {
    let input = process.argv.slice(2);
    if (input.length === 0) {
        input = Array.isArray(defaultInput) ? defaultInput : [defaultInput];
    }

    const start1 = process.hrtime();
    const answer1 = part1(...input);
    const time1 = process.hrtime(start1);
    console.log('Part 1 answer:', answer1);
    console.log('Part 1 time: %d ms', time1[0] * 1000 + time1[1] / 1000000);

    const start2 = process.hrtime();
    const answer2 = part2(...input);
    const time2 = process.hrtime(start2);
    console.log('Part 2 answer:', answer2);
    console.log('Part 2 time: %d ms', time2[0] * 1000 + time2[1] / 1000000);
}
