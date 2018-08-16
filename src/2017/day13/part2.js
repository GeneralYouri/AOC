/**
 * TODO: Instead of simulating via the generator, maybe we can calculate the answer instead?
 * For each scanner we can determine their cycle, and thus on which delays they would catch the packet
 * We then need to somehow return the lowest delay for which no scanner would catch the packet
 */
module.exports = (input) => {
    const scanners = input.split(/\n/g).map(value => value.split(': ').map(Number)).map(([depth, range]) => [depth, range * 2 - 2]);

    const isCaught = (delay) => {
        for (const [depth, range] of scanners) {
            if (((depth + delay) % range) === 0) {
                return true;
            }
        }
        return false;
    };

    let delay = 0;
    while (isCaught(delay)) {
        delay += 1;
    }
    return delay;
};
