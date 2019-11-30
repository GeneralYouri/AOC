const findHighest = (banks) => {
    let highIndex = -1;
    let highBank = -1;
    for (let b = 0; b < banks.length; b += 1) {
        const bank = banks[b];
        if (bank > highBank) {
            highIndex = b;
            highBank = bank;
        }
    }
    return [highIndex, highBank];
};

const getHash = (banks, offset) => {
    let hash = 0;
    for (let i = 0; i < 6; i += 1) {
        hash += banks[i + offset] << (5 * i);
    }
    // hash += (banks[7 + offset] & 0x7) << 28;
    return hash;
    // const a = (((((banks[0] << 5) + banks[1] << 5) + banks[2] << 5) + banks[3] << 5) + banks[4] << 5) + banks[5];
    // const b = (((((banks[6] << 5) + banks[7] << 5) + banks[8] << 5) + banks[9] << 5) + banks[10] << 5) + banks[11];
    // const c = (((banks[12] << 5) + banks[13] << 5) + banks[14] << 5) + banks[15];
    // return '' + a + b + c; // `${a},${b},${c}`;
};

// 12841, 8038
module.exports = (input) => {
    const banks = input.split(/\t/g).map(Number);
    const seenBefore1 = new Map();
    const seenBefore2 = new Map();
    let cycles = 0;

    let hashDelta = 0;
    for (let i = 0; i < banks.length; i += 1) {
        hashDelta += banks[i] << i;
    }
    let hash1 = getHash(banks, 0) + hashDelta;
    let hash2 = getHash(banks, 8) + hashDelta;
    while (!seenBefore1.has(hash1) || (seenBefore1.get(hash1) !== seenBefore2.get(hash2))) {
        seenBefore1.set(hash1, cycles);
        seenBefore2.set(hash2, cycles);
        cycles += 1;

        const [highIndex, highBank] = findHighest(banks);
        hashDelta -= banks[highIndex] << highIndex;
        banks[highIndex] = 0;

        let toDivide = highBank;
        for (let i = highIndex + 1; toDivide > 0; i += 1) {
            if (i === banks.length) {
                i = 0;
            }
            hashDelta += 1 << i;
            banks[i] += 1;
            toDivide -= 1;
        }

        hash1 = getHash(banks, 0) + hashDelta;
        hash2 = getHash(banks, 8) + hashDelta;
    }

    return [cycles, cycles - seenBefore1.get(hash1)];
};
