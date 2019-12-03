function Node() {
    this.children = [];
    this.metadata = [];
}

const parseNode = (stream, parent) => {
    const childrenCount = Number(stream.shift());
    const metadataCount = Number(stream.shift());
    const childSum = Array.from(Array(childrenCount)).reduce((sum, _, c) => {
        parent.children[c] = new Node();
        return sum + parseNode(stream, parent.children[c]);
    }, 0);
    const metaSum = Array.from(Array(metadataCount)).reduce((sum, _, m) => {
        parent.metadata[m] = stream.shift();
        return sum + Number(parent.metadata[m]);
    }, 0);
    return childSum + metaSum;
};

module.exports = (input) => {
    const stream = input.split(/\s/g);

    const tree = new Node();
    const parent = tree;

    return parseNode(stream, parent, 0);
};
