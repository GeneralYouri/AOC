const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('199\n'
        + '200\n'
        + '208\n'
        + '210\n'
        + '200\n'
        + '207\n'
        + '240\n'
        + '269\n'
        + '260\n'
        + '263')).toBe(5);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(1457);
});
