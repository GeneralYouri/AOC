const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('0,9 -> 5,9\n'
        + '8,0 -> 0,8\n'
        + '9,4 -> 3,4\n'
        + '2,2 -> 2,1\n'
        + '7,0 -> 7,4\n'
        + '6,4 -> 2,0\n'
        + '0,9 -> 2,9\n'
        + '3,4 -> 1,4\n'
        + '0,0 -> 8,8\n'
        + '5,5 -> 8,2')).toBe(12);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(22335);
});
