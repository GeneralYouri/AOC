const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('01245')).toBe(5);
    expect(part2('51589')).toBe(9);
    expect(part2('92510')).toBe(18);
    expect(part2('59414')).toBe(2018);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(20268576);
});
