const { part2, defaultInput } = require('./');

test('Provided test cases', () => {
    expect(part2('pbga (66)\n' +
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
        'cntj (57)')).toBe(60);
});

test('Puzzle input', () => {
    expect(part2(defaultInput)).toBe(333);
});
