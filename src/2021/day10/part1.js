require('../library.js');

const openers = '([{<';
const closers = ')]}>';
const scoreTable = [3, 57, 1197, 25137];

module.exports = (input) => {
    const lines = input.charLines();
    return lines.reduce((sum, line) => {
        const remainingStack = [];
        for (const char of line) {
            const i = openers.indexOf(char);
            if (i !== -1) {
                remainingStack.push(closers[i]);
            } else if (char !== remainingStack.pop()) {
                const j = closers.indexOf(char);
                return sum + scoreTable[j];
            }
        }
        return sum;
    }, 0);
};
