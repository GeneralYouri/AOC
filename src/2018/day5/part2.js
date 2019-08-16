const process = require('./process');

module.exports = (polymer) => {
    const reacted = process(polymer).join('');
    let best = reacted.length;
    for (let i = 1; i <= 26; i += 1) {
        const { length } = process(reacted, i);
        if (length < best) {
            best = length;
        }
    }
    return best;
};
