const { part1, part2, defaultInput } = require('./');

test('part 1', () => {
    expect(part1('5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8')).toBe(18);
    expect(part1(defaultInput)).toBe(46402);
});

test('part 2', () => {
    expect(part2('5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5')).toBe(9);
    expect(part2(defaultInput)).toBe(265);
});
