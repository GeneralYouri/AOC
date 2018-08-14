const { part2: knotHash } = require('../day10/index.js');

function hexToBin(hex) {
    return hex.split('').map(char => parseInt(char, 16).toString(2).padStart(4, '0')).join('');
}

const neighbourDeltas = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];

module.exports = (input) => {
    const hashes = [];

    for (let row = 0; row < 128; row += 1) {
        const hash = knotHash(`${input}-${row}`);
        hashes[row] = hexToBin(hash).split('').map(Number);
    }

    const groups = {};
    let groupCount = 0;

    function checkSquare(x, y) {
        if (x < 0 || x >= 128 || y < 0 || y >= 128) {
            return;
        }

        const square = hashes[x][y];
        const index = y * 128 + x;

        if (square === 1 && !groups[index]) {
            groups[index] = true;

            neighbourDeltas.forEach((delta) => {
                checkSquare(x + delta.x, y + delta.y);
            });
        }
    }

    for (let y = 0; y < 128; y += 1) {
        for (let x = 0; x < 128; x += 1) {
            const square = hashes[x][y];
            const index = y * 128 + x;

            if (square === 1 && !groups[index]) {
                groupCount += 1;
                groups[index] = true;

                neighbourDeltas.forEach((delta) => {
                    checkSquare(x + delta.x, y + delta.y);
                });
            }
        }
    }

    return groupCount;
};
