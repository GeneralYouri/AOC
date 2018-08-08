const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('0\n3\n0\n1\n-3')).toBe(10);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(22570529);
});
