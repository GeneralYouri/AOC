const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('5')).toBe('0124515891');
    expect(part1('9')).toBe('5158916779');
    expect(part1('18')).toBe('9251071085');
    expect(part1('2018')).toBe('5941429882');
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe('1191216109');
});
