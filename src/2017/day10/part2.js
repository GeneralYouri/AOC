const KnotHash = require('./knothash');

module.exports = (input, listLength = 256, rounds = 64) => {
    const lengths = input.split('').map(x => x.charCodeAt(0));
    lengths.push(17, 31, 73, 47, 23);

    const list = Array.from(Array(listLength)).map((_, i) => i);
    const knotHash = new KnotHash(list, 0, 0, lengths);
    for (let i = 0; i < rounds; i += 1) {
        knotHash.knot();
    }
    return knotHash.hash();
};
