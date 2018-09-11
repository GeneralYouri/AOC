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

const allSolutions = require('./src');


const formatTime = ms => Number(ms.toPrecision(7)).toFixed(3);

const formatHeader = (year, day = '', part = '') => {
    let header = year;
    header += day ? '.' + day.toString().padStart(2, ' ') : '';
    header += part ? '.' + part.toString().padStart(1, ' ') : '';
    return header.padEnd(9, ' ');
};

const formatInfo = ([year, day = '', part = ''], time, answer) => {
    const header = formatHeader(year, day, part);
    const timeStr = formatTime(time).slice(0, 8).padStart(8, ' ');
    return `${header} ✅ | \x1b[38;5;240mTime:\x1b[0m ${timeStr} ms | \x1b[38;5;240mAnswer:\x1b[0m ${answer}`;
};

const formatError = ([year, day = '', part = ''], message) => {
    const header = formatHeader(year, day, part);
    return `\x1b[31m${header}\x1b[0m ❌ | \x1b[31mSkip:\x1b[0m             | \x1b[31m${message}\x1b[0m`;
};

const formatTotal = (year, time, solved, solvedMax = 50) => {
    const header = year.toString().padEnd(9, ' ');
    const timeStr = formatTime(time).slice(0, 8).padStart(8, ' ');
    const solvedStr = solved.toString().padStart(2, ' ');
    const emote = solved === solvedMax ? '✅' : '❌';
    return `${header} ${emote} | \x1b[38;5;240mTime:\x1b[0m ${timeStr} ms | \x1b[38;5;240mSolved:\x1b[0m ${solvedStr} / ${solvedMax}`;
};

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
