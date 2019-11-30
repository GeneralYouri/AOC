// module.exports = (input) => {
//     const sheet = input.split(/\n/g).map(row => row.split(/\t/).map(Number));
//     const sumOfHighest = sheet.reduce((sum, row) => sum + Math.max(...row), 0);
//     const sumOfLowest = sheet.reduce((sum, row) => sum + Math.min(...row), 0);
//     return sumOfHighest - sumOfLowest;
// };

module.exports = (input) => {
    const sheet = input.split(/\n/g).map(row => row.split(/\t/).map(Number));
    return sheet.reduce((sum, row) => {
        const lowest = Math.min(...row);
        const highest = Math.max(...row);
        return sum + highest - lowest;
    }, 0);
};
