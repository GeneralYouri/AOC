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
        runs: {
            alias: ['repeat', 'r'],
            type: 'number',
            default: 1,
            describe: 'How many times every solution should be run; the runtimes will be averaged',
        },
        console: {
            alias: ['suppress-console', 'c'],
            type: 'boolean',
        },
    })
    .alias({ help: 'h', version: 'v' });

const { formatInfo, formatError, formatSeparator, formatTotal } = require('./lib');
const allSolutions = require('./src');


const allowConsole = argv.console !== undefined ? argv.console : allSolutions.length <= 1 && allSolutions[0].length <= 1;

const runPart = (year, day, part, fn, input) => {
    if (!fn) {
        throw new Error('No solution yet');
    }

    // Temporarily suppress console.log
    const oldLogger = console.log;
    if (!allowConsole) {
        console.log = () => {
        };
    }

    const bindFn = fn.bind(null, ...input);
    const answer = bindFn();
    if (answer === undefined) {
        // Restore console.log
        if (!allowConsole) {
            console.log = oldLogger;
        }

        throw new Error('No solution yet');
    }

    let time = 0;
    for (let run = 1; run <= argv.runs; run += 1) {
        // Run and time the solution
        const startTime = process.hrtime.bigint();
        try {
            bindFn();
        } catch (error) {
            // Restore console.log
            if (!allowConsole) {
                console.log = oldLogger;
            }

            throw new Error(error.message);
        }

        const endTime = process.hrtime.bigint();
        time += Number(endTime - startTime) / 1000000;
    }
    time /= argv.runs;

    // Restore console.log
    if (!allowConsole) {
        console.log = oldLogger;
    }

    return [answer, time];
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
                try {
                    const [answer, timePart] = runPart(year, day, part, solutionDay['part' + part], input);
                    console.log(formatInfo([year, day, part], timePart, answer));
                    if (timePart) {
                        timeYear += timePart;
                        solvedYear += 1;
                    }
                } catch (error) {
                    console.log(formatError([year, day, part], error.message));
                }
            }
        });
    });

    timeTotal += timeYear;
    solvedTotal += solvedYear;
    if (days.length > 1) {
        const yearLog = formatTotal([year], timeYear, solvedYear, days.length * 2);
        yearTotals.push(yearLog);
        console.log(formatSeparator());
        console.log(yearLog);
        console.log('');
    }
});

if (years.length > 1) {
    yearTotals.forEach(log => console.log(log));
    console.log(formatSeparator('='));
    console.log(formatTotal('All-time', timeTotal, solvedTotal, Object.keys(allSolutions).length * 50));
}
