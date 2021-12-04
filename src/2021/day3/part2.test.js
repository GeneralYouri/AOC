const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('00100\n'
        + '11110\n'
        + '10110\n'
        + '10111\n'
        + '10101\n'
        + '01111\n'
        + '00111\n'
        + '11100\n'
        + '10000\n'
        + '11001\n'
        + '00010\n'
        + '01010')).toBe(230);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(3414905);
});
