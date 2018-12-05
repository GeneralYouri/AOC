const isPolarOpposite = (charCode1, charCode2) => Math.abs(charCode1 - charCode2) === 32;

const fn = (charCodes, [exclude1, exclude2]) => {
    let lastLength = charCodes.length;

    while (true) {
        for (let i = 0; i < charCodes.length - 1; i += 1) {
            const charCode1 = charCodes[i];
            const charCode2 = charCodes[i + 1];
            if (charCode1 === exclude1 || charCode1 === exclude2) {
                continue;
            }
            if (isPolarOpposite(charCode1, charCode2)) {
                charCodes.splice(i, 2);
                // charCodes = [...charCodes.slice(0, i), charCodes.slice(i + 2)];
            }
        }

        if (charCodes.length === lastLength) {
            return charCodes.length;
        }
        lastLength = charCodes.length;
    }
};

module.exports = (input) => {
    const charCodes = input.split('').map(char => char.charCodeAt(0));
    return Array.from(new Array(26)).map((_, i) => i + 65).reduce((acc, exclude1) => {
        const exclude2 = exclude1 + 32;
        const subInput = charCodes.filter(charCode => charCode !== exclude1 && charCode !== exclude2);
        console.log(input.length, subInput.length);
        const result = fn(subInput, [exclude1, exclude2]);
        return Math.min(acc, result);
    }, Number.POSITIVE_INFINITY);
};
