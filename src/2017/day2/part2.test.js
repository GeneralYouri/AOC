const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5')).toBe(9);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(265);
});
