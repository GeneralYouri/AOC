const parseLine = /^(\w+)\s*\((\d+)\)(?:\s*->\s*(.*))?$/;

function linkChildNodes(nodes, children) {
    let names = Object.keys(children);
    for (let i = 0; i < names.length; i += 1) {
        const name = names[i];
        const node = nodes[name];
        /* eslint-disable no-param-reassign */
        children[name] = node;
        linkChildNodes(nodes, node.children);
        node.linked = true;
        names = Object.keys(children);
    }
}

function createTree(lines) {
    const nodes = {};

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const [name, weight, childLine] = parseLine.exec(line).slice(1);
        const children = childLine ? childLine.split(/,\s*/g).reduce((acc, child) => {
            acc[child] = null;
            return acc;
        }, {}) : {};

        nodes[name] = {
            name, weight: Number(weight), children, linked: false,
        };
    }

    const names = Object.keys(nodes);
    for (let i = 0; i < names.length; i += 1) {
        const name = names[i];
        const node = nodes[name];
        linkChildNodes(nodes, node.children);
    }

    for (let i = 0; i < names.length; i += 1) {
        const name = names[i];
        if (!nodes[name].linked) {
            return nodes[name];
        }
    }

    throw new Error('Malformed input - no tree root element present');
}

module.exports = (input) => {
    const lines = input.split(/\n/g);
    const root = createTree(lines);
    return root.name;
};
