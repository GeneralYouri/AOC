const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('forward 5\n'
        + 'down 5\n'
        + 'forward 8\n'
        + 'up 3\n'
        + 'down 8\n'
        + 'forward 2')).toBe(150);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(2039912);
});
