const { part2, defaultInput } = require('.');

test('Provided test cases', () => {
    const input =
        '/>-<\\  \n' +
        '|   |  \n' +
        '| /<+-\\\n' +
        '| | | v\n' +
        '\\>+</ |\n' +
        '  |   ^\n' +
        '  \\<->/';
    expect(part2(input)).toBe('6,4');
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe('69,67');
});
