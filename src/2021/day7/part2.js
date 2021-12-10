require('../library.js');

module.exports = (input) => {
    const crabs = input.ints();
    const max = Math.max(...crabs);
    return Math.min(...Array.from(Array(max + 1)).map((_, to) => crabs.map(from => Math.abs(to - from)).map(n => n * (n + 1) / 2).sum()));
};

// Alternative, but returns two possible answers
// module.exports = (input) => {
//     const crabs = input.ints();
//     const to = crabs.mean();
//     return [Math.floor(to), Math.ceil(to)].map(to => crabs.map(from => Math.abs(to - from)).map(n => n * (n + 1) / 2).sum());
// };
