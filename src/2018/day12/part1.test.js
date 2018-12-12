const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    const input =
        'initial state: #..#.#..##......###...###\n' +
        '\n' +
        '...## => #\n' +
        '..#.. => #\n' +
        '.#... => #\n' +
        '.#.#. => #\n' +
        '.#.## => #\n' +
        '.##.. => #\n' +
        '.#### => #\n' +
        '#.#.# => #\n' +
        '#.### => #\n' +
        '##.#. => #\n' +
        '##.## => #\n' +
        '###.. => #\n' +
        '###.# => #\n' +
        '####. => #';
    expect(part1(input)).toBe(325);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(1816);
});
