const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2\n')).toBe(66);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(13935);
});
