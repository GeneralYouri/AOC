const process = require('./process');

module.exports = (input) => {
    const commands = input.split(/\n/g);

    const registers = process(commands);
    return Math.max(...Object.values(registers));
};
