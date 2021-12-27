const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part2('5483143223\n'
        + '2745854711\n'
        + '5264556173\n'
        + '6141336146\n'
        + '6357385478\n'
        + '4167524645\n'
        + '2176841721\n'
        + '6882881134\n'
        + '4846848554\n'
        + '5283751526')).toBe(195);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(212);
});
