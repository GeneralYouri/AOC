const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('s1,x3/4,pe/b', 5)).toBe('baedc');
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe('glnacbhedpfjkiom');
});
