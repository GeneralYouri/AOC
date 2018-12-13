const { part1, defaultInput } = require('.');

test('Provided test cases', () => {
    const input =
        '/->-\\        \n' +
        '|   |  /----\\\n' +
        '| /-+--+-\\  |\n' +
        '| | |  | v  |\n' +
        '\\-+-/  \\-+--/\n' +
        '  \\------/   ';
    expect(part1(input)).toBe('7,3');
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe('117,62');
});
