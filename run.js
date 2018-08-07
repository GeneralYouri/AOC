/**
 * This is an adaptation of:
 * @see https://github.com/aoktayd/adventofcode/blob/master/run.js
 */

const { argv } = require('yargs')
    .options({
        year: {
            alias: 'y',
            type: 'number',
            default: 2017,
        },
        day: {
            alias: 'd',
            type: 'number',
            default: 0,
        },
        part: {
            alias: 'p',
            type: 'number',
            default: 0,
            implies: 'day',
        },
        input: {
            alias: 'i',
            type: 'string',
            implies: 'day',
        },
    });

const { year } = argv;

const days = argv.day ? [argv.day] : Array.from(Array(25)).map((_, i) => i + 1);
days.forEach((day) => {
    try {
        const { part1, part2, defaultInput } = require(`./src/${year}/day${day}/`);
        if (!defaultInput) {
            throw new Error('Old file structure detected');
        }

        const input = argv.input || defaultInput;

        if (part1 && (argv.part === 0 || argv.part === 1)) {
            console.log(`${year}.${day}.1`);
            console.log('Answer:', part1(input));
        }
        if (argv.part === 0) {
            console.log('----------');
        }
        if (part2 && (argv.part === 0 || argv.part === 2)) {
            console.log(`${year}.${day}.2`);
            console.log('Answer:', part2(input));
        }
    } catch (error) {
        console.error(`${year}.${day} skipped ::`, error.message);
    }

    console.log('==========');
});
