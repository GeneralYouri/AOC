const Dance = require('./dance');

const regexes = {
    s: /^s([a-z0-9]{1,2})$/,
    x: /^\w([a-z0-9]{1,2})\/([a-z0-9]{1,2})$/,
    p: /^\w([a-z0-9]{1,2})\/([a-z0-9]{1,2})$/,
};

module.exports = (input, programCount = 16, iterations = 1000000000) => {
    const moves = input.split(/,/g).map(value => [value[0], value.match(regexes[value[0]]).slice(1)]);
    const dance = new Dance(programCount, moves);

    const found = new Set();
    const results = [];
    let result;

    for (let i = 0; i < iterations; i += 1) {
        result = dance.perform();

        if (found.has(result)) {
            return results[iterations % i - 1];
        }

        results.push(result);
        found.add(result);
    }

    return result;
};
