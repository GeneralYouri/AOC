const Node = require('./node');

module.exports = class Tree {
    constructor(nodeData) {
        // Setup nodes
        this.nodes = nodeData.reduce((acc, [name, weight, childNames]) => {
            acc[name] = new Node(name, weight, childNames);
            return acc;
        }, {});

        // Link nodes to connect children and parent and create a (2-way) tree structure
        Object.values(this.nodes).forEach((node) => {
            node.children = node.children.map((childName) => {
                this.nodes[childName].parent = node;
                return this.nodes[childName];
            });
        });

        // Find the one node without parent
        this.root = Object.values(this.nodes).reduce((acc, node) => (node.parent ? acc : node), null);
    }
};
