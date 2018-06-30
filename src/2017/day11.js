const { defInput } = require('./input11.js');

const directions2 = {
    n: { x: 0, y: 1, z: -1 },
    ne: { x: 1, y: 0, z: -1 },
    se: { x: 1, y: -1, z: 0 },
    s: { x: 0, y: -1, z: 1 },
    sw: { x: -1, y: 0, z: 1 },
    nw: { x: -1, y: 1, z: 0 },
};

function parts(input) {
    let x = 0;
    let y = 0;
    let z = 0;
    let steps = 0;
    let maxSteps = 0;

    for (let i = 0; i < input.length; i += 1) {
        const dir = directions2[input[i]];
        x += dir.x;
        y += dir.y;
        z += dir.z;

        steps = Math.max(0, x) + Math.max(0, y) + Math.max(0, z);
        maxSteps = Math.max(steps, maxSteps);
    }

    return { part1: steps, part2: maxSteps };
}

function test(input = defInput) {
    const parsed = input.split(/,/g);

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
