const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    const input =
        '#1 @ 1,3: 4x4\n' +
        '#2 @ 3,1: 4x4\n' +
        '#3 @ 5,5: 2x2';
    expect(part1(input)).toBe(4);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(118539);
});
