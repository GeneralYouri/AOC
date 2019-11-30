// const Tree = require('./tree');
//
// const parseLine = /^(\w+)\s*\((\d+)\)(?:\s*->\s*(.*))?$/;
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
//     return tree.root.name;
// };

module.exports = (input) => {
    const names = [];
    const parents = {};
    input.split(/\n/g).forEach((line) => {
        const matches = line.match(/([a-z]+)/g);
        const name = matches[0];
        names.push(name);

        for (let c = 1; c < matches.length; c += 1) {
            parents[matches[c]] = name;
        }
    });

    for (let n = 0; n < names.length; n += 1) {
        if (!parents[names[n]]) {
            return names[n];
        }
    }
    return null;
};
