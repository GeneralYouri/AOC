const { range, isAxisAligned } = require('../library.js');

module.exports = (input) => {
    const lines = input.lines().map(line => line.ints().slices(2));
    const seen = new Set();
    const seenTwice = new Set();
    for (const line of lines.filter(isAxisAligned)) {
        for (const [x, y] of range(...line)) {
            const hash = `${x},${y}`;
            if (seen.has(hash)) {
                seenTwice.add(hash);
            }
            seen.add(hash);
        }
    }
    return seenTwice.size;
};
