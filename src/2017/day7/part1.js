const Tree = require('./tree');

const parseLine = /^(\w+)\s*\((\d+)\)(?:\s*->\s*(.*))?$/;

module.exports = (input) => {
    const lines = input.split(/\n/g);

    // Parse nodes
    const nodes = lines.map((line) => {
        const [name, weight, childLine] = parseLine.exec(line).slice(1);
        const childNames = childLine ? childLine.split(/,\s*/g) : [];
        return [name, Number(weight), childNames];
    });

    const tree = new Tree(nodes);
    return tree.root.name;
};
