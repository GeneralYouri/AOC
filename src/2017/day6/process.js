const findHighest = (banks) => {
    return banks.reduce(([highIndex, highBank], bank, index) => {
        return (bank > highBank) ? [index, bank] : [highIndex, highBank];
    }, [-1, Number.NEGATIVE_INFINITY]);
};

module.exports = (banks, getStepCount) => {
    const seenBefore = {};
    let cycles = 0;

    let hash = banks.join(',');
    while (!seenBefore[hash]) {
        seenBefore[hash] = cycles;
        cycles += 1;

        const [highIndex, highBank] = findHighest(banks);
        let toRedistribute = highBank;
        banks[highIndex] = 0;

        // Loop the banks only once, incrementing the calculated amount this bank should receive
        for (let i = 0; i < banks.length; i += 1) {
            const toAdd = Math.ceil(toRedistribute / (banks.length - i));
            toRedistribute -= toAdd;
            banks[(highIndex + i + 1) % banks.length] += toAdd;
        }

        hash = banks.join(',');
    }

    return getStepCount(cycles, seenBefore[hash]);
};
