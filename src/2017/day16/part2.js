const Dance = require('./dance');

// TODO:
// Try a more efficient approach that calculates permutations for the dance (separately for x+s and p moves)
// Once calculated for one dance, they can be easily multiplied to apply to a billion dances
// We're essentially merging all the different input moves together and then applying those
module.exports = (input, programCount = 16, iterations = 1000000000) => {
    const moves = input.split(/,/g).map(value => [value[0], ...value.slice(1).split(/\//)]);
    const dance = new Dance(programCount, moves);

    const found = {};
    const results = [];
    let result;

    for (let i = iterations; i > 0; i -= 1) {
        result = dance.perform();

        if (result in found) {
            return results[i % (found[result] - i) - 1];
        }

        results.push(result);
        found[result] = i;
    }

    return result;
};
