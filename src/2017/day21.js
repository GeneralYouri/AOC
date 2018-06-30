const { defInput } = require('./input21.js');

function Pattern(pattern) {
    this.pattern = pattern;
}

Pattern.prototype.binary = function binary() {
    return this.pattern;
};

function parts() {
    return { part1: undefined, part2: undefined };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(line => line.split(' => '));

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
