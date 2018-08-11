const process = require('./process');

module.exports = (input) => {
    const digits = input.split('').map(Number);

    // Filter all input digits to select only those identical to the next digit
    return process(digits, index => digits[(index + 1) % digits.length]);
};
