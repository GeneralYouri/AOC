// const Tree = require('./tree');
//
// const parseLine = /^(\w+) \((\d+)\)(?: -> (.*))?$/;
//
// function balanceTree(node) {
//     if (node.children.length === 0) {
//         node.cumulativeWeight = node.weight;
//         return null;
//     }
//
//     const answer = node.children.reduce((acc, child) => balanceTree(child) || acc, null);
//     if (answer !== null) {
//         return answer;
//     }
//
//     node.children.sort((a, b) => a.cumulativeWeight - b.v);
//     const weights = node.children.map(child => child.cumulativeWeight);
//     node.cumulativeWeight = node.weight + weights.reduce((acc, weight) => acc + weight, 0);
//
//     const isBalanced = weights[0] === weights[weights.length - 1];
//     if (!isBalanced) {
//         const unbalancedIndex = weights[0] === weights[1] ? weights.length - 1 : 0;
//         return node.children[unbalancedIndex].weight + node.children[1].cumulativeWeight - node.children[unbalancedIndex].cumulativeWeight;
//     }
//
//     return null;
// }
//
// module.exports = (input) => {
//     const lines = input.split(/\n/g);
//
//     // Parse nodes
//     const nodes = lines.map((line) => {
//         const [name, weight, childLine] = parseLine.exec(line).slice(1);
//         const childNames = childLine ? childLine.split(/,\s*/g) : [];
//         return [name, Number(weight), childNames];
//     });
//
//     const tree = new Tree(nodes);
//     return [tree.root.name, balanceTree(tree.root)];
// };

const parseLine = /^(\w+) \((\d+)\)(?: -> (.*))?$/;

module.exports = (input) => {
    const names = [];
    const parents = {};
    const nodes = {};
    const leaves = [];

    input.split(/\n/g).forEach((line) => {
        const matches = parseLine.exec(line);
        const name = matches[1];
        const weight = Number(matches[2]);
        names.push(name);

        if (matches[3] !== undefined) {
            const childNames = matches[3].split(', ');
            nodes[name] = { weight, childCount: childNames.length, children: [], cumulativeWeight: weight };
            for (let c = 0; c < childNames.length; c += 1) {
                parents[childNames[c]] = name;
            }
        } else {
            nodes[name] = { weight, childCount: 0, children: [], cumulativeWeight: weight };
            leaves.push(name);
        }
    });

    let part1;
    for (let n = 0; n < names.length; n += 1) {
        if (!parents[names[n]]) {
            part1 = names[n];
            break;
        }
    }

    let part2;
    let candidate;
    while (leaves.length > 0) {
        const leafName = leaves.pop();
        const leafNode = nodes[leafName];
        const parentName = parents[leafName];
        const parentNode = nodes[parentName];
        if (parentNode === undefined) {
            break;
        }

        const childNodes = parentNode.children;
        if (childNodes.length === 2) {
            const wrongNode = (childNodes[0].cumulativeWeight !== leafNode.cumulativeWeight) ? childNodes[0] : childNodes[1];
            part2 = wrongNode.weight - wrongNode.cumulativeWeight + leafNode.cumulativeWeight;
            break;
        } else if (childNodes.length === 0) {
            childNodes.push(leafNode);
        } else if (childNodes[0].cumulativeWeight !== leafNode.cumulativeWeight) {
            childNodes.push(leafNode);
            candidate = leafNode;
        }

        parentNode.cumulativeWeight += leafNode.cumulativeWeight;
        parentNode.childCount -= 1;
        if (parentNode.childCount === 0) {
            leaves.push(parentName);
        }
    }

    // If the node only has 2 children we can't have found it yet
    // TODO: Doesn't happen for my input or example input
    if (part2 === undefined) {
        console.log(candidate);
    }

    return [part1, part2];
};
