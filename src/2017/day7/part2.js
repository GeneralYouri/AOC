const Tree = require('./tree');

const parseLine = /^(\w+)\s*\((\d+)\)(?:\s*->\s*(.*))?$/;

function balanceTree(node) {
    if (node.children.length === 0) {
        node.cumulativeWeight = node.weight;
        return null;
    }

    const answer = node.children.reduce((acc, child) => balanceTree(child) || acc, null);
    if (answer !== null) {
        return answer;
    }

    node.children.sort((a, b) => a.cumulativeWeight - b.v);
    const weights = node.children.map(child => child.cumulativeWeight);
    node.cumulativeWeight = node.weight + weights.reduce((acc, weight) => acc + weight, 0);

    const isBalanced = weights[0] === weights[weights.length - 1];
    if (!isBalanced) {
        const unbalancedIndex = weights[0] === weights[1] ? weights.length - 1 : 0;
        return node.children[unbalancedIndex].weight + node.children[1].cumulativeWeight - node.children[unbalancedIndex].cumulativeWeight;
    }

    return null;
}

module.exports = (input) => {
    const lines = input.split(/\n/g);

    // Parse nodes
    const nodes = lines.map((line) => {
        const [name, weight, childLine] = parseLine.exec(line).slice(1);
        const childNames = childLine ? childLine.split(/,\s*/g) : [];
        return [name, Number(weight), childNames];
    });

    const tree = new Tree(nodes);

    return balanceTree(tree.root);
};
