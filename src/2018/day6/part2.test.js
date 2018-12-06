const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    const input =
        '1, 1\n' +
        '1, 6\n' +
        '8, 3\n' +
        '3, 4\n' +
        '5, 5\n' +
        '8, 9';
    expect(part2(input, 32)).toBe(16);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(42344);
});
