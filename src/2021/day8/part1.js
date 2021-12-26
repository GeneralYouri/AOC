require('../library.js');

module.exports = (input) => {
    const words = input.lines().map(line => line.words().slice(-4)).flat();
    return words.countIf(word => [2, 3, 4, 7].includes(word.length));
};
