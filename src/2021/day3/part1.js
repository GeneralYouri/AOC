require('../library.js');

module.exports = (input) => {
    const bitLines = input.charLines().mapMap(Number);
    const ones = bitLines.transpose().map(line => line.countIf(1));
    const gamma = parseInt(ones.map(n => 2 * n > bitLines.length).map(Number).join(''), 2);
    const epsilon = (1 << ones.length) - 1 - gamma;
    return gamma * epsilon;
};
