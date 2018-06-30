const { argv } = require('yargs')
    .options({
        year: {
            alias: ['y'],
            default: '2017',
            describe: 'The year from the challenge you want to run',
            requiresArg: true,
            type: 'number',
        },
        day: {
            alias: ['d'],
            describe: 'The day from the challenge you want to run',
            required: true,
            requiresArg: true,
            type: 'string',
        },
        verbose: {
            alias: 'v',
            default: false,
            describe: 'Enable verbose logging',
            type: 'boolean',
        },
    })
    .demandOption('day');

function main() {
    console.log(argv);
    // TODO
}

module.exports.main = main;
module.exports.default = module.exports;

if (module === require.main) {
    module.exports.main();
}
