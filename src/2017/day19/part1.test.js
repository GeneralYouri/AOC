const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1()).toBe('ABCDEF');
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe('VEBTPXCHLI');
});
