const { argv } = require('yargs')
    .options({
        year: {
            alias: ['years', 'y'],
            array: true,
            default: [],
            describe: 'The puzzle year(s) to run',
        },
        day: {
            alias: ['days', 'd'],
            array: true,
            default: [],
            implies: 'year',
            describe: 'The puzzle day(s) to run',
        },
        part: {
            alias: 'p',
            type: 'number',
            default: 0,
            implies: 'day',
            describe: 'The puzzle part (1 || 2) to run',
        },
        input: {
            alias: ['inputs', 'i'],
            implies: 'day',
            array: true,
            string: true,
            describe: 'The custom puzzle input, if any',
        },
        time: {
            alias: 't',
            type: 'bool',
            default: false,
            describe: 'Record puzzle runtimes',
        },
    })
    .alias({ help: 'h', version: 'v' });

const solutionsByYear = require('./src');

module.exports = solutionsByYear;


const years = argv.year.length ? argv.year : Object.keys(solutionsByYear);
const days = argv.day.length ? argv.day : Array.from(Array(25)).map((_, index) => index + 1);
years.forEach((year) => {
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
            console.log('==========');
        }
    });
});
