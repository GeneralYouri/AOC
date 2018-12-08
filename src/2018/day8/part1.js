function Node() {
    this.children = [];
    this.metadata = [];
}

const parseNode = (stream, parent, metadataSum) => {
    const childrenCount = stream.shift();
    const metadataCount = stream.shift();
    for (let c = 0; c < childrenCount; c += 1) {
        parent.children[c] = new Node();
        metadataSum = parseNode(stream, parent.children[c], metadataSum);
    }
    for (let m = 0; m < metadataCount; m += 1) {
        parent.metadata[m] = stream.shift();
        metadataSum += Number(parent.metadata[m]);
    }
    return metadataSum;
};

module.exports = (input) => {
    const stream = input.split(/\s/g);

    const tree = new Node();
    const parent = tree;

    return parseNode(stream, parent, 0);
};
