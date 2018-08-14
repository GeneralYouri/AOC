const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('flqrgnkx')).toBe(8108);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(8226);
});
