const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('set a 1\n' +
        'add a 2\n' +
        'mul a a\n' +
        'mod a 5\n' +
        'snd a\n' +
        'set a 0\n' +
        'rcv a\n' +
        'jgz a -1\n' +
        'set a 1\n' +
        'jgz a -2')).toBe(4);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(2951);
});
