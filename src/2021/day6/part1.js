require('../library.js');

module.exports = (input, target = 80) => {
    const fishies = input.ints();
    const counts = Array.from(Array(9)).map((_, age) => fishies.countIf(age));
    for (let i = 0; i < target; i += 1) {
        const spawners = counts.shift();
        counts.push(spawners);
        counts[6] += spawners;
    }
    return counts.sum();
};
