const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('3,4,1,5', 5)).toBe(12);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(52070);
});
