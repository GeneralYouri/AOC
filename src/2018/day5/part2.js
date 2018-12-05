const doReactions = require('./part1');

module.exports = (input) => {
    return Array.from(new Array(26)).map((_, i) => [String.fromCharCode(i + 65), String.fromCharCode(i + 97)]).reduce((acc, [exclude1, exclude2]) => {
        const subInput = input.replace(new RegExp('[' + exclude1 + exclude2 + ']', 'g'), '');
        const result = doReactions(subInput, [exclude1, exclude2]);
        return Math.min(acc, result);
    }, Number.POSITIVE_INFINITY);
};
