const benchmark = ({ fn, params = [], targetTime, targetRuns, minRuns }) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Can only benchmark a function');
    }

    if (!targetTime && !targetRuns) {
        targetTime = 1;
    }

    if (!targetRuns) {
        const startTime = process.hrtime.bigint();
        fn.call(null, ...params);
        const endTime = process.hrtime.bigint();

        const benchTime = Number(endTime - startTime);
        targetRuns = Math.max(minRuns || 1, Number((1e9 * targetTime / Number(benchTime)).toPrecision(1)));
    }

    let totalTime = 0;
    let batches = 0;
    do {
        for (let run = 1; run <= targetRuns; run += 1) {
            const startTime = process.hrtime.bigint();
            fn.call(null, ...params);
            const endTime = process.hrtime.bigint();

            totalTime += Number(endTime - startTime);
        }
        batches += 1;
    } while (targetTime && totalTime / 1e9 * (batches + 1) < targetTime * batches);
    console.log(`Ran ${batches * targetRuns} in ${batches} batches of ${targetRuns} runs each for a total time of ${totalTime / 1e9} out of ${targetTime}`);
    return totalTime / 1e6 / (batches * targetRuns);
};

module.exports = { benchmark };
