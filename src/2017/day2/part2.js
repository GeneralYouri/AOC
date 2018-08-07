module.exports = (input) => {
    const sheet = input.split(/\n/g).map(row => row.split(/\t/).map(Number));
    return sheet.reduce((sum, row) => {
        for (const x of row) {
            for (const y of row) {
                if (x !== y && x % y === 0) {
                    return sum + x / y;
                }
            }
        }
        return sum;
    }, 0);
};
