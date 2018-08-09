const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('0\t2\t7\t0')).toBe(5);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(12841);
});
