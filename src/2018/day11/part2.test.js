const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('18')).toBe('90,269,16');
    expect(part2('42')).toBe('232,251,12');
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe('236,151,15');
});
