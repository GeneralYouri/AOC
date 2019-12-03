const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('14')).toBe(2);
    expect(part2('1969')).toBe(966);
    expect(part2('100756')).toBe(50346);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(4941976);
});
