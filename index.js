/**
 * This is an adaptation of:
 * @see https://github.com/aoktayd/adventofcode/blob/master/run.js
 */

const { argv } = require('yargs')
    .options({
        year: {
            alias: 'y',
            type: 'number',
            default: 0,
        },
        day: {
            alias: 'd',
            type: 'number',
            default: 0,
            implies: 'year',
        },
        part: {
            alias: 'p',
            type: 'number',
            default: 0,
            implies: 'day',
        },
        input: {
            alias: 'i',
            implies: 'day',
            array: true,
            string: true,
        },
        time: {
            alias: 't',
            type: 'bool',
            default: false,
        },
    });

const solutionsByYear = require('./src');

module.exports = solutionsByYear;


const years = argv.year ? [argv.year] : Object.keys(solutionsByYear);
years.forEach((year) => {
    const days = argv.day ? [argv.day] : Array.from(Array(25)).map((_, index) => index + 1);
    days.forEach((day) => {
        try {
            // TODO: This whole sherade with error handling is ridiculous
            let part1;
            let part2;
            let defaultInput;
            try {
                ({ part1, part2, defaultInput } = solutionsByYear[year]['day' + day]);
            } catch (error) {
                throw new Error('No solution yet');
            }
            if (!defaultInput) {
                throw new Error('Old file structure detected');
            }

            let { input } = argv;
            if (!input) {
                input = Array.isArray(defaultInput) ? defaultInput : [defaultInput];
            }

            if (part1 && (argv.part === 0 || argv.part === 1)) {
                console.log(`${year}.${day}.1`);
                if (argv.time) {
                    const start = process.hrtime();
                    const answer = part1(...input);
                    const time = process.hrtime(start);
                    console.log('Answer:', answer);
                    console.log('Time: %d ms', time[0] * 1000 + time[1] / 1000000);
                } else {
                    console.log('Answer:', part1(...input));
                }
            }
            if (argv.part === 0) {
                console.log('----------');
            }
            if (part2 && (argv.part === 0 || argv.part === 2)) {
                console.log(`${year}.${day}.2`);
                if (argv.time) {
                    const start = process.hrtime();
                    const answer = part2(...input);
                    const time = process.hrtime(start);
                    console.log('Answer:', answer);
                    console.log('Time: %d ms', time[0] * 1000 + time[1] / 1000000);
                } else {
                    console.log('Answer:', part2(...input));
                }
            }
            console.log('==========');
        } catch (error) {
            console.log(`${year}.${day} skipped ::`, error.message);
        }
    });
});
