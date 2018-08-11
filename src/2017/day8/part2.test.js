const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('b inc 5 if a > 1\n' +
        'a inc 1 if b < 5\n' +
        'c dec -10 if a >= 1\n' +
        'c inc -20 if c == 10')).toBe(10);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(7774);
});
