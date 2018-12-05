const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('aA')).toBe(0);
    expect(part1('abBA')).toBe(0);
    expect(part1('abAB')).toBe(4);
    expect(part1('aabAAB')).toBe(6);
    expect(part1('dabAcCaCBAcCcaDA')).toBe(10);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(11152);
});
