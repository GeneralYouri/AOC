module.exports = (input) => {
    const phrases = input.split(/\n/g);

    let part1 = 0;
    let part2 = 0;
    for (let p = 0; p < phrases.length; p += 1) {
        const words = phrases[p].split(/ /);
        const wordsUsed1 = new Set();
        const wordsUsed2 = new Set();

        let isUsed1 = false;
        let isUsed2 = false;
        for (let w = 0; w < words.length && !isUsed1 && !isUsed2; w += 1) {
            const word = words[w];
            const oldSize1 = wordsUsed1.size;
            wordsUsed1.add(word);
            if (wordsUsed1.size === oldSize1) {
                isUsed1 = true;
            }

            const sorted = word.split('').sort().join('');
            const oldSize2 = wordsUsed2.size;
            wordsUsed2.add(sorted);
            if (wordsUsed2.size === oldSize2) {
                isUsed2 = true;
            }
        }

        if (!isUsed1) {
            part1 += 1;
        }
        if (!isUsed2) {
            part2 += 1;
        }
    }

    return [part1, part2];
};
