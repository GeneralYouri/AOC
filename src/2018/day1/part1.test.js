const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('+1\n-2\n+3\n+1')).toBe(3);
    expect(part1('+1\n+1\n+1')).toBe(3);
    expect(part1('+1\n+1\n-2')).toBe(0);
    expect(part1('-1\n-2\n-3')).toBe(-6);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(516);
});
