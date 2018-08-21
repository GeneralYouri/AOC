const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('s1,x3/4,pe/b', 5, 2)).toBe('ceadb');
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe('fmpanloehgkdcbji');
});
