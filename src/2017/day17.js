const { defInput } = require('./input17.js');

function Node(value) {
    this.value = value;
    this.next = this;
}

function part1(skips) {
    const base = new Node(0);
    let current = base;

    for (let i = 1; i <= 2017; i += 1) {
        for (let j = 0; j < skips % i; j += 1) {
            current = current.next;
        }

        const insert = new Node(i);
        insert.next = current.next;
        current.next = insert;
        current = insert;
    }
    return current.next.value;
}

function part2(skips) {
    let result = 0;
    let index = 0;

    for (let i = 1; i <= 50000000; i += 1) {
        index = (index + skips) % i + 1;

        if (index === 1) {
            result = i;
            console.log(result);
        }
    }

    return result;
}

function test(input = defInput) {
    const parsed = Number(input);

    console.log('Part 1 answer', part1(parsed));
    console.log('Part 2 answer', part2(parsed));
}

exports.part1 = part1;
exports.part2 = part2;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
