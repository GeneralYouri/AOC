const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('0\n3\n0\n1\n-3')).toBe(5);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(315613);
});
