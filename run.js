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
    })
    .alias({ help: 'h', version: 'v' });

const { formatInfo, formatError, formatTotal } = require('./lib');
const allSolutions = require('./src');


const runPart = (year, day, part, fn, input) => {
    if (!fn) {
        console.log(formatError([year, day, part], 'No solution yet'));
        return false;
    }

    // Temporarily suppress console.log
    const oldLogger = console.log;
    console.log = () => {
    };

    // Run and time the solution
    const startTime = process.hrtime.bigint();
    let answer;
    try {
        answer = fn(...input);
    } catch (error) {
        // Restore console.log
        console.log = oldLogger;

        console.log(formatError([year, day, part], error.message));
        return false;
    }

    const endTime = process.hrtime.bigint();
    const time = Number(endTime - startTime) / 1000000;

    // Restore console.log
    console.log = oldLogger;

    console.log(formatInfo([year, day, part], time, answer));
    return time;
};

const years = argv.year.length ? argv.year : Object.keys(allSolutions);
const days = argv.day.length ? argv.day : Array.from(Array(25)).map((_, index) => index + 1);

const yearTotals = [];
let timeTotal = 0;
let solvedTotal = 0;
years.forEach((year) => {
    const solutionYear = allSolutions[year];
    let timeYear = 0;
    let solvedYear = 0;

    if (!solutionYear) {
        console.log(formatError([year], 'No solutions yet'));
        console.log('');
        return;
    }

    days.forEach((day) => {
        const solutionDay = solutionYear['day' + day];
        if (!solutionDay) {
            console.log(formatError([year, day], 'No solution yet'));
            return;
        }
        if (!solutionDay.defaultInput) {
            console.log(formatError([year, day], 'Old file structure detected'));
            return;
        }

        const input = argv.input ? argv.input : [solutionDay.defaultInput];

        [1, 2].forEach((part) => {
            if (argv.part === 0 || argv.part === part) {
                const timePart = runPart(year, day, part, solutionDay['part' + part], input);
                if (timePart) {
                    timeYear += timePart;
                    solvedYear += 1;
                }
            }
        });
    });

    timeTotal += timeYear;
    solvedTotal += solvedYear;
    if (days.length > 1) {
        const yearLog = formatTotal([year], timeYear, solvedYear, days.length * 2);
        yearTotals.push(yearLog);
        console.log('------------+-------------------+----------------');
        console.log(yearLog);
        console.log('');
    }
});

if (years.length > 1) {
    yearTotals.forEach(log => console.log(log));
    console.log('============+===================+================');
    console.log(formatTotal('All-time', timeTotal, solvedTotal, Object.keys(allSolutions).length * 50));
}
