module.exports = (input) => {
    const hashes = input.split(/\n/g);
    const hashCount = hashes.length;
    const hashLength = hashes[0].length / 2;

    for (let i = 0; i < hashCount - 1; i += 1) {
        const x = hashes[i].split('');
        for (let j = i + 1; j < hashCount; j += 1) {
            const y = hashes[j].split('');
            let diff = 0;
            let index = 0;
            for (let c = 0; c < hashLength; c += 1) {
                if (x[c] !== y[c] || x[-c] !== y[-c]) {
                    diff += 1;
                    index = c;
                }
            }
            if (diff === 1) {
                x.splice(index, 1);
                return x.join('');
            }
        }
    }

    return undefined;
};
