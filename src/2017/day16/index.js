const { defInput } = require('./input.js');

const programCount = 16;

function dance(startNames, danceMoves) {
    let names = startNames.split('');
    const indices = {};
    for (let i = 0; i < programCount; i += 1) {
        indices[names[i]] = i;
    }
    let startIndex = 0;

    const rotateIndex = index => (Number(index) + startIndex + programCount) % programCount;

    const operations = {
        s(count) {
            startIndex = rotateIndex(-count);
        },
        x(i1, i2) {
            const index1 = rotateIndex(i1);
            const index2 = rotateIndex(i2);
            const name1 = names[index1];
            const name2 = names[index2];
            operations.swap(index1, index2, name1, name2);
        },
        p(name1, name2) {
            const index1 = indices[name1];
            const index2 = indices[name2];
            operations.swap(index1, index2, name1, name2);
        },

        swap(index1, index2, name1, name2) {
            names[index1] = name2;
            names[index2] = name1;
            indices[name1] = index2;
            indices[name2] = index1;
        },
    };

    for (let i = 0; i < danceMoves.length; i += 1) {
        const [operation, ...args] = danceMoves[i];
        operations[operation](...args);
    }

    names = [...names.slice(startIndex), ...names.slice(0, startIndex)];
    Object.keys(indices).forEach((name) => {
        indices[name] = (indices[name] - startIndex + programCount) % programCount;
    });

    return names.join('');
}

function parts(input) {
    const names = Array.from(Array(programCount)).map((_, i) => String.fromCharCode(i + 97));
    const part1 = dance(names.join(''), input);

    const found = {};
    const results = [];
    let result = part1;

    for (let i = 999999999; i > 0; i -= 1) {
        result = dance(result, input);

        if (result in found) {
            result = results[i % (found[result] - i) - 1];
            break;
        }

        results.push(result);
        found[result] = i;
    }

    return { part1, part2: result };
}

function test(input = defInput) {
    const parsed = input.split(/,/g).map(value => [value[0], ...value.slice(1).split(/\//)]);

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
