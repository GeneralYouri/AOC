const { part1, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part1('pbga (66)\n' +
        'xhth (57)\n' +
        'ebii (61)\n' +
        'havc (66)\n' +
        'ktlj (57)\n' +
        'fwft (72) -> ktlj, cntj, xhth\n' +
        'qoyq (66)\n' +
        'padx (45) -> pbga, havc, qoyq\n' +
        'tknk (41) -> ugml, padx, fwft\n' +
        'jptl (61)\n' +
        'ugml (68) -> gyxo, ebii, jptl\n' +
        'gyxo (61)\n' +
        'cntj (57)')).toBe('tknk');
});

test('Puzzle input', () => {
    expect(part1(defaultInput)).toBe('rqwgj');
});
