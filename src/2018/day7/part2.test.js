const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    const input =
        'Step C must be finished before step A can begin.\n' +
        'Step C must be finished before step F can begin.\n' +
        'Step A must be finished before step B can begin.\n' +
        'Step A must be finished before step D can begin.\n' +
        'Step B must be finished before step E can begin.\n' +
        'Step D must be finished before step E can begin.\n' +
        'Step F must be finished before step E can begin.';
    expect(part2(input, 6, 2, 0)).toBe(15);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(1133);
});
