module.exports = (input) => {
    const phrases = input.split(/\n/g).map(row => row.split(/ /));

    return phrases.reduce((validPhrases, words) => {
        const wordsUsed = {};

        let isValid = true;
        for (const word of words) {
            if (wordsUsed[word]) {
                isValid = false;
                break;
            }

            wordsUsed[word] = true;
        }

        return validPhrases + Number(isValid);
    }, 0);
};
