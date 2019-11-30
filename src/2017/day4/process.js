module.exports = (phrases, hasher) => {
    return phrases.reduce((validPhrases, words) => {
        const wordsUsed = new Set();

        let isValid = true;
        for (const word of words) {
            const hash = hasher(word);
            if (wordsUsed.has(hash)) {
                isValid = false;
                break;
            }

            wordsUsed.add(hash);
        }

        return validPhrases + Number(isValid);
    }, 0);
};
