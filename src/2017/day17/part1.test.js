const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1(3)).toBe(638);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(1642);
});
