const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('0: 3\n' +
        '1: 2\n' +
        '4: 4\n' +
        '6: 4')).toBe(24);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(2604);
});
