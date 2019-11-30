const process = require('./process');

module.exports = (input) => {
    const banks = input.split(/\t/g).map(Number);

    const [cycles, lastSeen] = process(banks);
    return cycles - lastSeen;
};
