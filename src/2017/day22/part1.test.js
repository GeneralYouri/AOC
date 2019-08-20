const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('' +
        '..#\n' +
        '#..\n' +
        '...')).toBe(5587);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(5411);
});
