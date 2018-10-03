const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('' +
        'p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>\n' +
        'p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>\n' +
        'p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>\n' +
        'p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>')).toBe(1);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(477);
});
