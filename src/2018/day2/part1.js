module.exports = (input) => {
    const hashes = input.split(/\n/g);
    const hashCount = hashes.length;
    const hashLength = hashes[0].length;

    let twos = 0;
    let threes = 0;

    for (let h = 0; h < hashCount; h += 1) {
        const counts = Array(26).fill(0);
        for (let i = 0; i < hashLength; i += 1) {
            counts[hashes[h].charCodeAt(i) - 97] += 1;
        }

        if (counts.includes(2)) {
            twos += 1;
        }
        if (counts.includes(3)) {
            threes += 1;
        }
    }

    return twos * threes;
};
