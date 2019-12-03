const createGroup = require('./group');

module.exports = (input) => {
    const connections = input.split(/\n/g).map(line => line.split(/ <-> /));
    const nodes = connections.reduce((acc, [node, neighbourString]) => {
        acc[node] = neighbourString.split(/, /g).map(Number);
        return acc;
    }, {});

    let groups = 0;
    let keys = Object.keys(nodes);

    while (keys.length > 0) {
        const root = keys[0];
        createGroup(nodes, root);
        groups += 1;
        keys = Object.keys(nodes);
    }

    return groups;
};
