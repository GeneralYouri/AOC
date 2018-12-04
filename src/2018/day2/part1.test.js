const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    const input =
        'abcdef\n' +
        'bababc\n' +
        'abbcde\n' +
        'abcccd\n' +
        'aabcdd\n' +
        'abcdee\n' +
        'ababab';
    expect(part1(input)).toBe(12);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(5681);
});
