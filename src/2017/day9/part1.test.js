const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('{}')).toBe(1);
    expect(part1('{{{}}}')).toBe(6);
    expect(part1('{{},{}}')).toBe(5);
    expect(part1('{{{},{},{{}}}}')).toBe(16);
    expect(part1('{<a>,<a>,<a>,<a>}')).toBe(1);
    expect(part1('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toBe(9);
    expect(part1('{{<!!>},{<!!>},{<!!>},{<!!>}}')).toBe(9);
    expect(part1('{{<a!>},{<a!>},{<a!>},{<ab>}}')).toBe(3);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(16689);
});
