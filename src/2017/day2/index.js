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

    console.log('Part 1 answer:', part1(...input));
    console.log('Part 2 answer:', part2(...input));
}
