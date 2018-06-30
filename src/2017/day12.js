const { defInput } = require('./input12.js');

function parts(input) {
    const nodes = input.reduce((acc, value) => {
        acc[value[0]] = value[1].split(', ').map(Number);
        return acc;
    }, {});

    const groups = [];
    const counts = [];

    function handleGroup(node) {
        const index = groups.length;
        const group = [];
        let count = 0;

        function handleNode(current) {
            const neighbours = nodes[current];
            if (neighbours === undefined) {
                return;
            }

            delete nodes[current];
            neighbours.forEach((neighbour) => {
                if (group[neighbour]) {
                    return;
                }

                group[neighbour] = true;
                count += 1;
                handleNode(neighbour);
            });
        }

        handleNode(node);

        groups[index] = group;
        counts[index] = count;
    }

    let keys = Object.keys(nodes);
    while (keys.length > 0) {
        handleGroup(keys[0]);
        keys = Object.keys(nodes);
    }

    return { part1: counts[0], part2: groups.length };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(value => value.split(' <-> '));

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
