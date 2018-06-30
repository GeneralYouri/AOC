const { defInput } = require('./input9.js');

function parts(input) {
    let index = 0;

    let groups = 0;
    let depth = 0;
    let garbage = false;
    let garbageCount = 0;

    while (index < input.length) {
        const char = input[index];

        if (garbage) {
            if (char === '!') {
                index += 1;
            } else if (char === '>') {
                garbage = false;
            } else {
                garbageCount += 1;
            }
        } else if (!garbage) {
            if (char === '{') {
                depth += 1;
                groups += depth;
            } else if (char === '}') {
                depth -= 1;
            } else if (char === '<') {
                garbage = true;
            }
        }

        index += 1;
    }

    return { part1: groups, part2: garbageCount };
}

function test(input = defInput) {
    const answer = parts(input);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
