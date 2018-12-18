const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    const input =
        '.#.#...|#.\n' +
        '.....#|##|\n' +
        '.|..|...#.\n' +
        '..|#.....#\n' +
        '#.#|||#|#|\n' +
        '...#.||...\n' +
        '.|....|...\n' +
        '||...#|.#|\n' +
        '|.||||..|.\n' +
        '...#.|..|.';
    expect(part1(input)).toBe(1147);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(594712);
});
