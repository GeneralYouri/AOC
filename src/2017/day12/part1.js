const createGroup = require('./group');

module.exports = (input) => {
    const connections = input.split(/\n/g).map(value => value.split(' <-> '));
    const nodes = connections.reduce((acc, [node, neighbourString]) => {
        acc[node] = neighbourString.split(', ').map(Number);
        return acc;
    }, {});

    const root = Object.keys(nodes)[0];
    const group = createGroup(nodes, root);

    return Object.keys(group).length;
};
