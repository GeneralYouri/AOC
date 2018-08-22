const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('0/2\n' +
        '2/2\n' +
        '2/3\n' +
        '3/4\n' +
        '3/5\n' +
        '0/1\n' +
        '10/1\n' +
        '9/10')).toBe(31);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(1868);
});
