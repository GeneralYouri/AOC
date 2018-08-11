const KnotHash = require('./knothash');

module.exports = (input, listLength = 256) => {
    const lengths = input.split(/,/g).map(Number);

    const list = Array.from(Array(listLength)).map((_, i) => {
        return i;
    });

    const knotHash = new KnotHash(list, 0, 0, lengths);
    knotHash.knot();
    return knotHash.list[0] * knotHash.list[1];
};
