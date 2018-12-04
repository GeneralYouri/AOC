const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    const input =
        'abcde\n' +
        'fghij\n' +
        'klmno\n' +
        'pqrst\n' +
        'fguij\n' +
        'axcye\n' +
        'wvxyz';
    expect(part2(input)).toBe('fgij');
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe('uqyoeizfvmbistpkgnocjtwld');
});
