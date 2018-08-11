const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('<>')).toBe(0);
    expect(part2('<random characters>')).toBe(17);
    expect(part2('<<<<>')).toBe(3);
    expect(part2('<{!>}>')).toBe(2);
    expect(part2('<!!>')).toBe(0);
    expect(part2('<!!!>>')).toBe(0);
    expect(part2('<{o"i!a,<{i<a>')).toBe(10);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(7982);
});
