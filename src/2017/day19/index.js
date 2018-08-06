const { defInput } = require('./input.js');

function Map(data) {
    this.data = data;
}
Map.prototype.char = function char(pos) { return this.data[pos.y][pos.x]; };

function Pos(...args) {
    const pos = (args[0] instanceof Pos) ? args[0] : args;
    [this.x, this.y] = pos;
    [this[0], this[1]] = pos;
}
Pos.prototype.clone = function clone(...args) {
    const pos = (args[0] instanceof Pos) ? args[0] : [...args, 0, 0];
    return new Pos(this.x + pos[0], this.y + pos[1]);
};
Pos.prototype.up = function up() { return new Pos(this.x, this.y - 1); };
Pos.prototype.right = function right() { return new Pos(this.x + 1, this.y); };
Pos.prototype.down = function down() { return new Pos(this.x, this.y + 1); };
Pos.prototype.left = function left() { return new Pos(this.x - 1, this.y); };
Pos.prototype.toString = function toString() { return `Pos(${this.x},${this.y})`; };

function parts(mapData) {
    const map = new Map(mapData);
    const start = new Pos(map.data[0].indexOf('|'), 0);

    let answer = '';
    let steps = 0;
    let p0 = start.clone();
    let dp = new Pos(0, 1);

    /* eslint-disable no-constant-condition */
    while (true) {
        const char = map.char(p0);

        if (char === '+') {
            if (dp.x === 0 && map.char(p0.left()) !== ' ') {
                dp = new Pos(-1, 0);
            } else if (dp.x === 0 && map.char(p0.right()) !== ' ') {
                dp = new Pos(1, 0);
            } else if (dp.y === 0 && map.char(p0.up()) !== ' ') {
                dp = new Pos(0, -1);
            } else if (dp.y === 0 && map.char(p0.down()) !== ' ') {
                dp = new Pos(0, 1);
            } else {
                throw new Error('WTF BOOM');
            }
        } else if (char === ' ') {
            return { part1: answer, part2: steps };
        } else if (char !== '|' && char !== '-') {
            answer += char;
        }

        p0 = p0.clone(dp);
        steps += 1;
    }
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(line => line.split(''));

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
