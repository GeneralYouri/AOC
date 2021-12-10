const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('3,4,3,1,2', 18)).toBe(26);
    expect(part1('3,4,3,1,2')).toBe(5934);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(391888);
});
