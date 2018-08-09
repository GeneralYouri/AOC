const findHighest = (banks) => {
    return banks.reduce(([highIndex, highValue], bank, index) => {
        if (bank > highValue) {
            return [index, bank];
        }
        return [highIndex, highValue];
    }, [-1, Number.NEGATIVE_INFINITY]);
};

module.exports = (input) => {
    const banks = input.split(/\t/g).map(Number);
    const seenBefore = {};
    let cycles = 0;

    let hash = banks.join(',');
    while (!seenBefore[hash]) {
        seenBefore[hash] = cycles;
        cycles += 1;

        const [highIndex, highValue] = findHighest(banks);

        let toRedistribute = highValue;
        banks[highIndex] = 0;

        // Loop the banks only once, incrementing the calculated amount this bank should receive
        for (let i = 0; i < banks.length; i += 1) {
            const toAdd = Math.ceil(toRedistribute / (banks.length - i));
            toRedistribute -= toAdd;
            banks[(highIndex + i + 1) % banks.length] += toAdd;
        }

        hash = banks.join(',');
    }

    return cycles - seenBefore[hash];
};
