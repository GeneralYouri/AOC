require('../library.js');

const sampleSignalPatterns = 'abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg';
const patternsByDigit = sampleSignalPatterns.words();
const segmentCountsByLetter = patternsByDigit.join('').chars().frequencies();
const countSumsByDigit = patternsByDigit.map(pattern => pattern.chars().map(letter => segmentCountsByLetter[letter]).sum());

module.exports = (input) => {
    return input.lines().map((line) => {
        const [patterns, output] = line.split(' | ').map(str => str.words());
        const segmentCounts = patterns.join('').chars().frequencies();
        const digits = output.map((word) => {
            const countSum = word.chars().map(letter => segmentCounts[letter]).sum();
            return countSumsByDigit.indexOf(countSum);
        });
        return Number(digits.join(''));
    }).sum();
};
