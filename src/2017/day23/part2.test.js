const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('' +
        '..#\n' +
        '#..\n' +
        '...')).toBe(2511944);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(2511416);
});
