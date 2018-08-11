const process = require('./process');

module.exports = (input) => {
    const steps = input.split(/,/g);

    let maxStepCount = 0;
    process(steps, (stepCount) => {
        maxStepCount = Math.max(maxStepCount, stepCount);
    });
    return maxStepCount;
};
