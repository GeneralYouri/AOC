const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('ne,ne,ne')).toBe(3);
    expect(part1('ne,ne,sw,sw')).toBe(0);
    expect(part1('ne,ne,s,s')).toBe(2);
    expect(part1('se,sw,se,sw,sw')).toBe(3);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(764);
});
