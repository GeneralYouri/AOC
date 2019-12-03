// TODO: Use yargs Commands
const { argv } = require('yargs')
    .options({
        year: {
            alias: ['years', 'y'],
            array: true,
            default: [],
            describe: 'The puzzle year(s) to run, 0 for the most recent',
        },
        day: {
            alias: ['days', 'd'],
            array: true,
            default: [],
            implies: 'year',
            describe: 'The puzzle day(s) to run, 0 for the most recent',
        },
        part: {
            alias: 'p',
            type: 'number',
            default: 3,
            implies: 'day',
            describe: 'The puzzle part (1 || 2) to run (0 for combined solution, 3 for both parts)',
        },
        input: {
            alias: ['inputs', 'i'],
            implies: 'day',
            array: true,
            string: true,
            describe: 'The custom puzzle input, if any',
        },
        time: {
            alias: ['targetTime', 't'],
            type: 'number',
            conflicts: 'runs',
            describe: 'How much time to give for benchmarking every solution; a reasonable run count will be calculated',
        },
        runs: {
            alias: ['repeat', 'r'],
            type: 'number',
            conflicts: 'time',
            describe: 'How many times every solution should be run; the runtimes will be averaged',
        },
        minRuns: {
            alias: ['minRepeat', 'm'],
            type: 'number',
            default: 1,
            describe: 'The minimum number of times every solution should be run in case the target time doesn\'t allow for a sufficient number of runs',
        },
        console: {
            alias: ['suppress-console', 'c'],
            type: 'boolean',
        },
    })
    .alias({ help: 'h', version: 'v' });

const { formatInfo, formatError, formatSeparator, formatTotal } = require('./lib');
const allSolutions = require('./src');
const { benchmark } = require('./benchmark');


const allowConsole = argv.console !== undefined ? argv.console : allSolutions.length <= 1 && allSolutions[0].length <= 1;

const runSolution = (fn, input) => {
    if (!fn) {
        throw new Error('No solution yet');
    }

    // Temporarily suppress console.log
    const oldLogger = console.log;
    if (!allowConsole) {
        console.log = () => {
        };
    }

    try {
        const answer = fn.call(null, ...input);
        if (answer === undefined) {
            throw new Error('No solution yet');
        }

        const time = benchmark({ fn, params: input, targetTime: argv.time, targetRuns: argv.runs, minRuns: argv.minRuns });

        // Restore console.log
        if (!allowConsole) {
            console.log = oldLogger;
        }

        return [answer, time];
    } catch (error) {
        // Restore console.log
        if (!allowConsole) {
            console.log = oldLogger;
        }

        throw new Error(error.message);
    }
};

const years = argv.year.length ? argv.year : Object.keys(allSolutions);
const days = argv.day.length ? argv.day : Array.from(Array(25)).map((_, index) => index + 1);

const yearTotals = [];
let timeTotal = 0;
let solvedTotal = 0;
years.forEach((year) => {
    if (year === 0) {
        year = Math.max(...Object.keys(allSolutions));
        while (!allSolutions[year]) {
            year -= 1;
        }
    }

    const solutionYear = allSolutions[year];
    let timeYear = 0;
    let solvedYear = 0;

    if (!solutionYear) {
        console.log(formatError([year], 'No solutions yet'));
        console.log('');
        return;
    }

    days.forEach((day) => {
        if (day === 0) {
            day = 25;
            while (!solutionYear['day' + day]) {
                day -= 1;
            }
        }

        const solutionDay = solutionYear['day' + day];
        if (!solutionDay || !solutionDay.defaultInput) {
            console.log(formatError([year, day], 'No solution yet'));
            return;
        }

        const input = argv.input || [solutionDay.defaultInput];

        if (argv.part === 0) {
            try {
                const [answer, timePart] = runSolution(solutionDay.solution, input);
                console.log(formatInfo([year, day], timePart, answer));
                if (timePart) {
                    timeYear += timePart;
                    solvedYear += 1;
                }
            } catch (error) {
                console.log(formatError([year, day], error.message));
            }
        }
        [1, 2].forEach((part) => {
            if ((argv.part & part) !== 0) {
                try {
                    const [answer, timePart] = runSolution(solutionDay['part' + part], (days.length === 25 && day === 25 && part === 2) ? [...input, solvedYear] : input);
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
        const yearLog = formatTotal([year], timeYear, solvedYear, days.length * Math.trunc(argv.part / 3 + 1));
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
