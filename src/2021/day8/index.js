const { readFileSync } = require('fs');
const { runSolution } = require('../../../lib');
const part1 = require('./part1');
const part2 = require('./part2');

const defaultInput = readFileSync(require.resolve('./input.txt'), { encoding: 'UTF-8' });
module.exports = { part1, part2, defaultInput };

if (module === require.main) {
    (async () => {
        let input = process.argv.slice(2);
        if (input.length === 0) {
            input = Array.isArray(defaultInput) ? defaultInput : [defaultInput];
        }

        await runSolution('Part 1', part1, input);
        await runSolution('Part 2', part2, input);
    })();
}
