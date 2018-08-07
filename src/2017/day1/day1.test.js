const { part1, part2, defaultInput } = require('./');

test('part 1', () => {
    expect(part1('1122')).toBe(3);
    expect(part1('1111')).toBe(4);
    expect(part1('1234')).toBe(0);
    expect(part1('91212129')).toBe(9);
    expect(part1(defaultInput)).toBe(1228);
});

test('part 2', () => {
    expect(part2('1212')).toBe(6);
    expect(part2('1221')).toBe(0);
    expect(part2('123425')).toBe(4);
    expect(part2('123123')).toBe(12);
    expect(part2('12131415')).toBe(4);
    expect(part2(defaultInput)).toBe(1238);
});
