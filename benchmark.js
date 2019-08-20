const benchmark = ({ fn, params = [], runs, targetTime }) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Can only benchmark a function');
    }

    if (!targetTime) {
        targetTime = 1;
    }

    if (!runs) {
        const startTime = process.hrtime.bigint();
        fn.call(null, ...params);
        const endTime = process.hrtime.bigint();

        const benchTime = Number(endTime - startTime);
        runs = Math.max(1, Number((1e9 * targetTime / Number(benchTime)).toPrecision(1)));
    }

    let totalTime = 0;
    for (let run = 1; run <= runs; run += 1) {
        const startTime = process.hrtime.bigint();
        fn.call(null, ...params);
        const endTime = process.hrtime.bigint();

        totalTime += Number(endTime - startTime);
    }
    return totalTime / 1e6 / runs;
};

module.exports = { benchmark };
