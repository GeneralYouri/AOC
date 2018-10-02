const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2()).toBe(38);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(18702);
});
