const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2()).toBeUndefined();
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBeUndefined();
});
