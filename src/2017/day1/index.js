const part1 = require('./part1');
const part2 = require('./part2');
const defaultInput = require('./input');

module.exports = { part1, part2, defaultInput };

if (module === require.main) {
    const input = process.argv[2] || defaultInput;
    console.log('Part 1 answer:', part1(input));
    console.log('Part 2 answer:', part2(input));
}
