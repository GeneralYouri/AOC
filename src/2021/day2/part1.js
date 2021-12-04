require('../library.js');

module.exports = (input) => {
    const lines = input.wordLines().mapMap(null, Number);

    let x = 0;
    let depth = 0;

    for (const [type, value] of lines) {
        if (type === 'forward') {
            x += value;
        }
        if (type === 'down') {
            depth += value;
        }
        if (type === 'up') {
            depth -= value;
        }
    }

    return x * depth;
};
