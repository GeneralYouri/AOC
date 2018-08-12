const fillGroup = (group, node, nodes) => {
    const neighbours = nodes[node];
    group[node] = true;
    delete nodes[node];
    neighbours.forEach((neighbour) => {
        if (group[neighbour]) {
            return;
        }

        group[neighbour] = true;
        fillGroup(group, neighbour, nodes);
    });
};

const createGroup = (nodes, root) => {
    const group = {};
    fillGroup(group, root, nodes);
    return group;
};

module.exports = createGroup;
