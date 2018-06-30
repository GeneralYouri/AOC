const { defInput } = require('./input13.js');

function parts(input) {
    const ranges = input.reduce((acc, [depth, range]) => {
        acc[depth] = range;
        return acc;
    }, {});

    const layers = Object.keys(ranges).map(Number);
    const severities = [];

    function testDelay(delay) {
        severities[delay] = 0;
        let caught = false;

        for (let i = 0; i < layers.length; i += 1) {
            const layer = layers[i];
            const range = ranges[layer];
            const mod = range * 2 - 2;

            if ((layer + delay) % mod === 0) {
                severities[delay] += layer * range;
                caught = true;
            }
        }

        return caught;
    }

    for (let delay = 0; testDelay(delay); delay += 1) ;
    // let delay = 0;
    // do {
    //     testDelay(delay);
    //     delay += 1;
    // } while (!foundNotCaught);

    return { part1: severities[0], part2: severities.length - 1 };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(value => value.split(': ').map(Number));

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
