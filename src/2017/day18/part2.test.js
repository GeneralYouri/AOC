const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('snd 1\n' +
        'snd 2\n' +
        'snd p\n' +
        'rcv a\n' +
        'rcv b\n' +
        'rcv c\n' +
        'rcv d')).toBe(3);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(7366);
});
