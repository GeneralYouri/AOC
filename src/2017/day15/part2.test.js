const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('65\n8921')).toBe(309);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(323);
});
