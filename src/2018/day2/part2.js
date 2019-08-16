module.exports = (input) => {
    const hashes = input.split(/\n/g);
    const hashCount = hashes.length;
    const hashLength = hashes[0].length;

    for (let a = 0; a < hashCount - 1; a += 1) {
        const charsA = hashes[a];
        for (let b = a + 1; b < hashCount; b += 1) {
            const charsB = hashes[b];
            let diff = 0;
            let index = 0;
            for (let i = 0; i < hashLength / 2; i += 1) {
                if (charsA[i] !== charsB[i]) {
                    diff += 1;
                    if (diff > 1) {
                        break;
                    }
                    index = i;
                } else if (charsA[-i] !== charsB[-i]) {
                    diff += 1;
                    if (diff > 1) {
                        break;
                    }
                    index = -i;
                }
            }
            if (diff === 1) {
                return charsA.slice(0, index) + charsA.slice(index + 1);
            }
        }
    }

    return undefined;
};
