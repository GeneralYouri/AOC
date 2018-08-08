module.exports = (input) => {
    const banks = input.split(/\t/g).map(Number);
    const statesVisited = {};
    let cycles = 0;

    /* eslint-disable no-constant-condition */
    while (true) {
        cycles += 1;
        let largeValue = Number.NEGATIVE_INFINITY;
        let largeIndex = -1;

        for (let i = 0; i < banks.length; i += 1) {
            const bank = banks[i];
            if (bank > largeValue) {
                largeValue = bank;
                largeIndex = i;
            }
        }

        banks[largeIndex] = 0;
        for (let j = 1; j <= largeValue; j += 1) {
            banks[(largeIndex + j) % banks.length] += 1;
        }

        const hash = banks.join(',');
        if (statesVisited[hash]) {
            return cycles;
        }
        statesVisited[hash] = true;
    }
};
