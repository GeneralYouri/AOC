/**
 * TODO: Instead of simulating via the generator, maybe we can calculate the answer instead?
 * For each scanner we can determine their cycle, and thus on which delays they would catch the packet
 * We then need to somehow return the lowest delay for which no scanner would catch the packet
 */
module.exports = (input) => {
    const scanners = input.split(/\n/g).map(value => value.split(': ').map(Number));

    for (let delay = 0; true; delay += 1) {
        const notCaught = scanners.every(([depth, range]) => {
            const cycle = range * 2 - 2;
            const caught = (depth + delay) % cycle === 0;
            return !caught;
        });
        if (notCaught) {
            return delay;
        }
    }
};
