const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('65\n8921')).toBe(588);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(567);
});
