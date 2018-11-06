const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('' +
        '../.# => ##./#../...\n' +
        '.#./..#/### => #..#/..../..../#..#', 2)).toBe(12);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(3018423);
});
