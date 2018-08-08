module.exports = (input) => {
    const phrases = input.split(/\n/g).map(row => row.split(/ /));

    let validPhrases = 0;

    for (let i = 0; i < phrases.length; i += 1) {
        const phrase = phrases[i];
        const wordsUsed = {};

        let isValid = true;
        for (let j = 0; j < phrase.length; j += 1) {
            const word = phrase[j];

            if (wordsUsed[word]) {
                isValid = false;
            } else {
                wordsUsed[word] = true;
            }
        }

        if (isValid) {
            validPhrases += 1;
        }
    }

    return validPhrases;
};
