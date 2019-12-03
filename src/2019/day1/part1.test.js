const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('12')).toBe(2);
    expect(part1('14')).toBe(2);
    expect(part1('1969')).toBe(654);
    expect(part1('100756')).toBe(33583);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(3296560);
});
