const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('1122')).toBe(3);
    expect(part1('1111')).toBe(4);
    expect(part1('1234')).toBe(0);
    expect(part1('91212129')).toBe(9);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(1228);
});
