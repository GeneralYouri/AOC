const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('forward 5\n'
        + 'down 5\n'
        + 'forward 8\n'
        + 'up 3\n'
        + 'down 8\n'
        + 'forward 2')).toBe(900);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(1942068080);
});
