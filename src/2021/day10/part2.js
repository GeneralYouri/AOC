require('../library.js');

const openers = '([{<';
const closers = ')]}>';

module.exports = (input) => {
    const lines = input.charLines();
    const scores = [];
    for (const line of lines) {
        const expected = [];
        let isCorrupted = false;
        for (const char of line) {
            const i = openers.indexOf(char);
            if (i !== -1) {
                expected.push(closers[i]);
            } else {
                if (char !== expected.pop()) {
                    isCorrupted = true;
                    break;
                }
            }
        }
        if (!isCorrupted) {
            const score = expected.reverse().reduce((s, char) => s * 5 + closers.indexOf(char) + 1, 0);
            scores.push(score);
        }
    }
    return scores.median();
};
