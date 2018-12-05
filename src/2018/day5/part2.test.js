const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('dabAcCaCBAcCcaDA')).toBe(4);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(6136);
});
