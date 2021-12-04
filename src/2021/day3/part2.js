require('../library.js');

const process = (bitLines, keepMostCommon) => {
    const length = bitLines[0].length;
    for (let i = 0; i < length; i += 1) {
        const ones = bitLines.transpose()[i].countIf(1);
        const bit = Number(2 * ones >= bitLines.length);
        bitLines = bitLines.filter(line => (line[i] === bit) === keepMostCommon);
        if (bitLines.length <= 1) {
            return bitLines[0];
        }
    }
    throw new Error(`Could not reduce to a single unique bitLine (${bitLines.length} remaining)`);
};

module.exports = (input) => {
    const bitLines = input.charLines().mapMap(Number);
    const oxygen = parseInt(process(bitLines, true).join(''), 2);
    const carbon = parseInt(process(bitLines, false).join(''), 2);
    return oxygen * carbon;
};
