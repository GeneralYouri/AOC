const { defInput } = require('./input4.js');

function parts(phrases) {
    let validPhrases1 = 0;
    let validPhrases2 = 0;

    for (let i = 0; i < phrases.length; i += 1) {
        const phrase = phrases[i];
        const wordsUsed1 = {};
        const wordsUsed2 = {};

        let isValid1 = true;
        let isValid2 = true;
        for (let j = 0; j < phrase.length; j += 1) {
            const word = phrase[j];

            if (wordsUsed1[word]) {
                isValid1 = false;
            } else {
                wordsUsed1[word] = true;
            }

            const letters = phrase[j].split('').map(l => l.charCodeAt(0)).sort().join(',');

            if (wordsUsed2[letters]) {
                isValid2 = false;
            } else {
                wordsUsed2[letters] = true;
            }
        }

        if (isValid1) {
            validPhrases1 += 1;
        }
        if (isValid2) {
            validPhrases2 += 1;
        }
    }

    return { validPhrases1, validPhrases2 };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(row => row.split(/ /));

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.validPhrases1);
    console.log('Part 2 answer', answer.validPhrases2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
