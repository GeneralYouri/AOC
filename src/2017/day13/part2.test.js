const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('0: 3\n' +
        '1: 2\n' +
        '4: 4\n' +
        '6: 4')).toBe(10);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(3941460);
});
