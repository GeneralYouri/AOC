const { defInput } = require('./input.js');

const denseLength = 16;
const sparseLength = 16;
const listLength = denseLength * sparseLength;
const rounds = 64;

function reverse(list, start, length) {
    const shifted = [...list.splice(start), ...list];
    const reversed = [...shifted.splice(0, length).reverse(), ...shifted];
    return [...reversed.splice(listLength - start), ...reversed];
}

function round(startList, input, startPos, startSkip) {
    let list = startList;
    let pos = startPos;
    let skip = startSkip;

    for (let i = 0; i < input.length; i += 1) {
        const length = input[i];
        list = reverse(list, pos, length);
        pos = (pos + length + skip) % listLength;
        skip += 1;
    }

    return { list, pos, skip };
}

function part1(input) {
    const parsed = input.split(/,/g).map(Number);

    let list = Array.from(Array(listLength)).map((x, i) => {
        return i;
    });

    ({ list } = round(list, parsed, 0, 0));

    return list[0] * list[1];
}

function part2(input) {
    const parsed = input.split('').map(x => x.charCodeAt(0));
    parsed.push(17, 31, 73, 47, 23);

    let list = Array.from(Array(listLength)).map((x, i) => {
        return i;
    });

    let pos = 0;
    let skip = 0;
    for (let i = 0; i < rounds; i += 1) {
        ({ list, pos, skip } = round(list, parsed, pos, skip));
    }

    const blocks = [];
    for (let i = 0; i < sparseLength; i += 1) {
        blocks[i] = list.splice(0, denseLength).reduce((acc, val) => acc ^ val, 0);
    }
    return blocks.map(val => val.toString(16).padStart(2, '0')).join('');
}

function test(input = defInput) {
    console.log('Part 1 answer', part1(input));
    console.log('Part 2 answer', part2(input));
}

exports.part1 = part1;
exports.part2 = part2;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
