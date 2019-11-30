const findHighest = (banks) => {
    const maxValue = Math.max(...banks);
    return Array.from(banks.entries()).find(([, value]) => value === maxValue);
};

const redistribute = (banks, amount, baseIndex) => {
    for (let i = baseIndex + 1; amount > 0; i += 1) {
        if (i === banks.length) {
            i = 0;
        }
        banks[i] += 1;
        amount -= 1;
    }
};

module.exports = (banks) => {
    const seenBefore = new Map();
    let cycles = 0;

    let hash = banks.join(',');
    while (!seenBefore.has(hash)) {
        seenBefore.set(hash, cycles);
        cycles += 1;

        const [highIndex, highBank] = findHighest(banks);
        banks[highIndex] = 0;
        redistribute(banks, highBank, highIndex);

        hash = banks.join(',');
    }

    return [cycles, seenBefore.get(hash)];
};
