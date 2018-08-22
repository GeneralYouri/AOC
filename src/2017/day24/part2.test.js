const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('0/2\n' +
        '2/2\n' +
        '2/3\n' +
        '3/4\n' +
        '3/5\n' +
        '0/1\n' +
        '10/1\n' +
        '9/10')).toBe(19);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(1841);
});
