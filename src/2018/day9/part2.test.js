const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    // These are custom answers to part 1 test inputs, not explicitly mentioned in description
    expect(part2('9 players; last marble is worth 25 points')).toBe(22563);
    expect(part2('10 players; last marble is worth 1618 points')).toBe(74765078);
    expect(part2('13 players; last marble is worth 7999 points')).toBe(1406506154);
    expect(part2('17 players; last marble is worth 1104 points')).toBe(20548882);
    expect(part2('21 players; last marble is worth 6111 points')).toBe(507583214);
    expect(part2('30 players; last marble is worth 5807 points')).toBe(320997431);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(3009951158);
});
