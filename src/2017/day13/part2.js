const process = require('./process');

/**
 * TODO: Instead of simulating via the generator, we can probably calculate the answer instead
 * For each scanner we can determine their cycle, and thus on which delays they would catch the packet
 * We then need to somehow return the lowest delay for which no scanner would catch the packet
 */
module.exports = (input) => {
    const scanners = input.split(/\n/g).map(value => value.split(': ').map(Number));

    const gen = process(scanners);

    for (const [delay, wasCaught] of gen) {
        if (!wasCaught) {
            gen.return();
            return delay;
        }
    }

    return undefined;
};
