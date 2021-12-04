const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('199\n'
        + '200\n'
        + '208\n'
        + '210\n'
        + '200\n'
        + '207\n'
        + '240\n'
        + '269\n'
        + '260\n'
        + '263')).toBe(7);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(1390);
});
