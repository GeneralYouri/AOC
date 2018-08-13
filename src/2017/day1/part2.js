const process = require('./process');

module.exports = (input) => {
    const digits = input.split('').map(Number);

    // Filter all input digits to select only those identical to the opposite digit, which is halfway around the list
    return process(digits, index => digits[(index + digits.length / 2) % digits.length]);
};
