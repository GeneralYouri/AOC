const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    const input =
        '1, 1\n' +
        '1, 6\n' +
        '8, 3\n' +
        '3, 4\n' +
        '5, 5\n' +
        '8, 9';
    expect(part1(input)).toBe(17);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(4754);
});
