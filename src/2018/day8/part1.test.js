const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2\n')).toBe(138);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(38722);
});
