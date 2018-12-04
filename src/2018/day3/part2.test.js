const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    const input =
        '#1 @ 1,3: 4x4\n' +
        '#2 @ 3,1: 4x4\n' +
        '#3 @ 5,5: 2x2';
    expect(part2(input)).toBe(3);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(1270);
});
