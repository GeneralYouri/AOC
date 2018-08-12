const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('0 <-> 2\n' +
        '1 <-> 1\n' +
        '2 <-> 0, 3, 4\n' +
        '3 <-> 2, 4\n' +
        '4 <-> 2, 3, 6\n' +
        '5 <-> 6\n' +
        '6 <-> 4, 5')).toBe(6);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(378);
});
