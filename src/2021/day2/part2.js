require('../library.js');

module.exports = (input) => {
    const lines = input.wordLines().mapMap(null, Number);

    let x = 0;
    let depth = 0;
    let aim = 0;

    for (const [type, value] of lines) {
        if (type === 'forward') {
            x += value;
            depth += aim * value;
        } else if (type === 'down') {
            aim += value;
        } else if (type === 'up') {
            aim -= value;
        }
    }

    return x * depth;
};
