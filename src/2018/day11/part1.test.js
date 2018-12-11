const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('18')).toBe('33,45');
    expect(part1('42')).toBe('21,61');
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe('243,43');
});
