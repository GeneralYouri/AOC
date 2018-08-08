const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('1')).toBe(0);
    expect(part1('12')).toBe(3);
    expect(part1('23')).toBe(2);
    expect(part1('1024')).toBe(31);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(552);
});
