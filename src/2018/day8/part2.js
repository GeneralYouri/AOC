function Node() {
    this.children = [];
    this.metadata = [];
}

const parseNode = (stream, parent) => {
    const childValues = [];
    const childrenCount = stream.shift();
    const metadataCount = stream.shift();
    let value = 0;
    if (childrenCount === '0') {
        for (let m = 0; m < metadataCount; m += 1) {
            parent.metadata[m] = stream.shift();
            value += Number(parent.metadata[m]);
        }
    } else {
        for (let c = 0; c < childrenCount; c += 1) {
            parent.children[c] = new Node();
            childValues[c] = parseNode(stream, parent.children[c]);
        }
        for (let m = 0; m < metadataCount; m += 1) {
            parent.metadata[m] = stream.shift();
            value += childValues[parent.metadata[m] - 1] || 0;
        }
    }
    return value;
};

module.exports = (input) => {
    const stream = input.split(/\s/g);

    const tree = new Node();
    const parent = tree;

    return parseNode(stream, parent);
};
