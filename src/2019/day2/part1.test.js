const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('1,9,10,3,2,3,11,0,99,30,40,50', false)).toBe(3500);
    expect(part1('1,0,0,0,99', false)).toBe(2);
    expect(part1('2,3,0,3,99', false)).toBe(2);
    expect(part1('2,4,4,5,99,0', false)).toBe(2);
    expect(part1('1,1,1,4,99,5,6,0,99', false)).toBe(30);
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe(5866663);
});
