module.exports = (input) => {
    const phrases = input.split(/\n/g).map(row => row.split(/ /));

    return phrases.reduce((validPhrases, words) => {
        const wordsUsed = {};

        let isValid = true;
        for (const word of words) {
            const letters = word.split('').sort().join('');
            if (wordsUsed[letters]) {
                isValid = false;
                break;
            }

            wordsUsed[letters] = true;
        }

        return validPhrases + Number(isValid);
    }, 0);
};
