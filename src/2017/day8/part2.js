const process = require('./process');

module.exports = (input) => {
    const commands = input.split(/\n/g);

    let highValue = 0;
    process(commands, (value) => {
        highValue = Math.max(highValue, value);
    });
    return highValue;
};
