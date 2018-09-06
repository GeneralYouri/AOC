// TODO: Use yargs Commands
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

const runPart = (year, day, partFn, input) => {
    const startTime = process.hrtime.bigint();
    const answer = partFn(...input);
    const endTime = process.hrtime.bigint();
    const time = Number(endTime - startTime) / 1000000;
    console.log('Answer:', answer);
    if (argv.time) {
        console.log('Time: %d ms', time);
    }
    return time;
};

let timeTotal = 0;
years.forEach((year) => {
    let timeYear = 0;
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
                timeYear += runPart(year, day, part1, input);
            }
            if (part2 && (argv.part === 0 || argv.part === 2)) {
                console.log(`${year}.${day}.2`);
                timeYear += runPart(year, day, part2, input);
            }
            console.log('----------');
        } catch (error) {
            console.log(`${year}.${day} skipped ::`, error.message);
            console.log('----------');
        }
    });
    timeTotal += timeYear;
    if (argv.time && days.length > 1) {
        console.log('%d total time: %d ms', year, timeYear);
        console.log('==========');
    }
});
if (argv.time && years.length > 1) {
    console.log('All years total time: %d ms', timeTotal);
}
