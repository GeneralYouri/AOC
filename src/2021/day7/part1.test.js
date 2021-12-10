const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('16,1,2,0,4,2,7,1,2,14')).toBe(37);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(349812);
});
