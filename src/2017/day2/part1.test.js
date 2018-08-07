const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8')).toBe(18);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(46402);
});
