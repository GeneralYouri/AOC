require('../library.js');

module.exports = (input) => {
    const crabs = input.ints();
    const to = crabs.median();
    return crabs.map(from => Math.abs(to - from)).sum();
};
