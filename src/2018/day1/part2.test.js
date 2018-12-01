const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('+1\n-2\n+3\n+1')).toBe(2);
    expect(part2('+1\n-1')).toBe(0);
    expect(part2('+3\n+3\n+4\n-2\n-4')).toBe(10);
    expect(part2('-6\n+3\n+8\n+5\n-6')).toBe(5);
    expect(part2('+7\n+7\n-2\n-7\n-4')).toBe(14);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(71892);
});
