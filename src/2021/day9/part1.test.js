const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('2199943210\n'
        + '3987894921\n'
        + '9856789892\n'
        + '8767896789\n'
        + '9899965678')).toBe(15);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(600);
});
