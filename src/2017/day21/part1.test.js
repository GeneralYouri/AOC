const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('' +
        '../.# => ##./#../...\n' +
        '.#./..#/### => #..#/..../..../#..#', 2)).toBe(12);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(186);
});
