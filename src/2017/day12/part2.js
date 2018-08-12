const createGroup = require('./group');

module.exports = (input) => {
    const connections = input.split(/\n/g).map(value => value.split(' <-> '));
    const nodes = connections.reduce((acc, [node, neighbourString]) => {
        acc[node] = neighbourString.split(', ').map(Number);
        return acc;
    }, {});

    const groups = [];
    let keys = Object.keys(nodes);

    while (keys.length > 0) {
        const root = keys[0];
        groups.push(createGroup(nodes, root));
        keys = Object.keys(nodes);
    }

    return groups.length;
};
