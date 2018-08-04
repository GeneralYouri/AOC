const { defInput } = require('./input7.js');

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

// TODO: This turned ugly, needs refactoring
function recurse(node) {
    const names = Object.keys(node.children);
    if (names.length <= 1) {
        return [node.name, node.weight];
    }

    const weights = [];
    for (let i = 0; i < names.length; i += 1) {
        const child = node.children[names[i]];
        const [name, weight] = recurse(child);
        weights.push([name, weight]);
    }

    weights.sort((a, b) => a.weight - b.weight);
    const isBalanced = weights[0][1] === weights[weights.length - 1][1];
    if (!isBalanced) {
        const unbalancedIndex = weights[0][1] === weights[1][1] ? weights.length - 1 : 0;
        const answer = weights[unbalancedIndex][0] + weights[1][1] - weights[unbalancedIndex][1];
        throw new Error(answer);
    }

    return [
        node.weight,
        weights[1][1] * weights.length + node.weight,
    ];
}


function parts(lines) {
    const root = createTree(lines);
    let answer;
    try {
        recurse(root);
    } catch (e) {
        answer = e.message;
    }
    return { part1: root.name, part2: answer };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g);

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
