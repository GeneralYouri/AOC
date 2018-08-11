const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('b inc 5 if a > 1\n' +
        'a inc 1 if b < 5\n' +
        'c dec -10 if a >= 1\n' +
        'c inc -20 if c == 10')).toBe(1);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(4888);
});
