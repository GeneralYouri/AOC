require('../library.js');

// Note: The part 1 solution also works, this solution showcases a different approach that can handle larger inputs
const timerNew = 8;
const timerReset = 6;
module.exports = (input, target = 256) => {
    const fishies = input.ints();

    const spawns = Array(timerNew + 1).fill(0);
    spawns[0] = spawns[timerReset + 1] = 1;
    for (let i = timerNew + 1; i <= target; i += 1) {
        spawns[i] = spawns[i - 7] + spawns[i - 9];
    }

    const totals = spawns.prefixSums();
    return fishies.map(fish => totals[target - 1 - fish] + 1).sum();
};
