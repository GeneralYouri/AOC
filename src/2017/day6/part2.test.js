const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('0\t2\t7\t0')).toBe(4);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(8038);
});
