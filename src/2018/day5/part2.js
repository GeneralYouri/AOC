const process = require('./process');

module.exports = (input) => {
    const reacted = process(input).join('');
    let best = reacted.length;
    for (let i = 1; i <= 26; i += 1) {
        const { length } = process(reacted, i);
        if (length < best) {
            best = length;
        }
    }
    return best;
};
