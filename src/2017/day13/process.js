const testDelay = (scanners, delay) => {
    return scanners.reduce(([wasCaught, severity], [depth, range]) => {
        const cycle = range * 2 - 2;
        const caught = (depth + delay) % cycle === 0;
        return caught ? [true, severity + depth * range] : [wasCaught, severity];
    }, [false, 0]);
};

// TODO: Apparently the generator approach makes this several times slower
module.exports = function* process(scanners) {
    for (let delay = 0; true; delay += 1) {
        yield [delay, ...testDelay(scanners, delay)];
    }
};
