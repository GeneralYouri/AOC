module.exports = (input) => {
    const sheet = input.split(/\n/g).map(row => row.split(/\t/).map(Number));
    return sheet.reduce((sum, row) => {
        const lowest = Math.min(...row);
        const highest = Math.max(...row);
        return sum + highest - lowest;
    }, 0);
};
