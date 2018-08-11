module.exports = (phrases, hasher) => {
    return phrases.reduce((validPhrases, words) => {
        const wordsUsed = {};

        let isValid = true;
        for (const word of words) {
            const hash = hasher(word);
            if (wordsUsed[hash]) {
                isValid = false;
                break;
            }

            wordsUsed[hash] = true;
        }

        return validPhrases + Number(isValid);
    }, 0);
};
