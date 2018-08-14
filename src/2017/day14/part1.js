const { part2: knotHash } = require('../day10/index.js');

function hexToBin(hex) {
    return hex.split('').map(char => parseInt(char, 16).toString(2).padStart(4, '0')).join('');
}

module.exports = (input) => {
    const hashes = [];
    let used = 0;

    for (let row = 0; row < 128; row += 1) {
        const hash = knotHash(`${input}-${row}`);
        hashes[row] = hexToBin(hash).split('').map(Number);
        used += hashes[row].filter(char => char === 1).length;
    }

    return used;
};
