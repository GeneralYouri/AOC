const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    const input =
        'x=495, y=2..7\n' +
        'y=7, x=495..501\n' +
        'x=501, y=3..7\n' +
        'x=498, y=2..4\n' +
        'x=506, y=1..2\n' +
        'x=498, y=10..13\n' +
        'x=504, y=10..13\n' +
        'y=13, x=498..504';
    expect(part1(input)).toBe(57);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(29802);
});
