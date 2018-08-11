const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('')).toBe('a2582a3a0e66e6e86e3812dcb672a272');
    expect(part2('AoC 2017')).toBe('33efeb34ea91902bb2f59c9920caa6cd');
    expect(part2('1,2,3')).toBe('3efbe78a8d82f29979031a4aa0b16a9d');
    expect(part2('1,2,4')).toBe('63960835bcdc130f0b66d7ff4f6a5a8e');
});

test('Puzzle input', () => {
    expect(part2(...defaultInput)).toBe('7f94112db4e32e19cf6502073c66f9bb');
});
