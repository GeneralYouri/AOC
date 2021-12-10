const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('3,4,3,1,2')).toBe(26984457539);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(1754597645339);
});
