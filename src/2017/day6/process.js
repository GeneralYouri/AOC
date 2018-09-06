const findHighest = (banks) => {
    return banks.reduce(([highIndex, highBank], bank, index) => {
        return (bank > highBank) ? [index, bank] : [highIndex, highBank];
    }, [-1, Number.NEGATIVE_INFINITY]);
};

// Loop the banks only once, incrementing the calculated amount this bank should receive
const redistribute = (banks, amount, baseIndex) => {
    for (let i = 0; i < banks.length; i += 1) {
        const toAdd = Math.ceil(amount / (banks.length - i));
        amount -= toAdd;
        banks[(baseIndex + i + 1) % banks.length] += toAdd;
    }
};

module.exports = (banks, getStepCount) => {
    const seenBefore = {};
    let cycles = 0;

    let hash = banks.join(',');
    while (!seenBefore[hash]) {
        seenBefore[hash] = cycles;
        cycles += 1;

        const [highIndex, highBank] = findHighest(banks);
        banks[highIndex] = 0;
        redistribute(banks, highBank, highIndex);

        hash = banks.join(',');
    }

    return getStepCount(cycles, seenBefore[hash]);
};
