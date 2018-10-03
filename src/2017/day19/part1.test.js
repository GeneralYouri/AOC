const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('' +
        '     |          \n' +
        '     |  +--+    \n' +
        '     A  |  C    \n' +
        ' F---|----E|--+ \n' +
        '     |  |  |  D \n' +
        '     +B-+  +--+ \n' +
        '                ')).toBe('ABCDEF');
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe('VEBTPXCHLI');
});
