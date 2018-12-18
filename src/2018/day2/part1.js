module.exports = (input) => {
    const hashes = input.split(/\n/g);
    const hashCount = hashes.length;
    const hashLength = hashes[0].length;

    let twos = 0;
    let threes = 0;

    let lastChars = hashes[0];
    const counts = Array.from(new Array(26), () => 0);
    for (let c = 0; c < lastChars.length; c += 1) {
        counts[lastChars.charCodeAt(c) - 97] += 1;
    }

    if (counts.includes(2)) {
        twos += 1;
    }
    if (counts.includes(3)) {
        threes += 1;
    }

    for (let h = 1; h < hashCount; h += 1) {
        const chars = hashes[h];
        for (let c = 0; c < hashLength; c += 1) {
            if (chars[c] !== lastChars[c]) {
                counts[lastChars.charCodeAt(c) - 97] -= 1;
                counts[chars.charCodeAt(c) - 97] += 1;
            }
        }

        if (counts.includes(2)) {
            twos += 1;
        }
        if (counts.includes(3)) {
            threes += 1;
        }
        lastChars = chars;
    }

    return twos * threes;
};
