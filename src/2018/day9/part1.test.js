const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    expect(part1('9 players; last marble is worth 25 points')).toBe(32);
    expect(part1('10 players; last marble is worth 1618 points')).toBe(8317);
    expect(part1('13 players; last marble is worth 7999 points')).toBe(146373);
    expect(part1('17 players; last marble is worth 1104 points')).toBe(2764);
    expect(part1('21 players; last marble is worth 6111 points')).toBe(54718);
    expect(part1('30 players; last marble is worth 5807 points')).toBe(37305);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(374690);
});
