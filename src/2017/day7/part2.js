const parseLine = /^(\w+) \((\d+)\)(?: -> (.*))?$/;

module.exports = (input) => {
    const nodes = {};
    const parents = {};
    const leaves = [];

    input.split(/\n/g).forEach((line) => {
        const matches = parseLine.exec(line);
        const name = matches[1];
        const weight = Number(matches[2]);

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
            return wrongNode.weight - wrongNode.cumulativeWeight + leafNode.cumulativeWeight;
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
    console.log(candidate);

    return null;
};
