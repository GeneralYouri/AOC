const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('flqrgnkx')).toBe(1242);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(1128);
});
