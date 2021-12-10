const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('16,1,2,0,4,2,7,1,2,14')).toBe(168);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(99763899);
});
