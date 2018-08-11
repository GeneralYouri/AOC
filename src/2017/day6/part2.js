const process = require('./process');

module.exports = (input) => {
    const banks = input.split(/\t/g).map(Number);

    return process(banks, (cycles, lastSeen) => cycles - lastSeen);
};
