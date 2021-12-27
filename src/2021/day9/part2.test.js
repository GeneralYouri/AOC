const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('2199943210\n'
        + '3987894921\n'
        + '9856789892\n'
        + '8767896789\n'
        + '9899965678')).toBe(1134);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(987840);
});
