const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('' +
        'p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>\n' +
        'p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>')).toBe(0);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(144);
});
