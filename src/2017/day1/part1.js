module.exports = (input) => {
    const digits = input.split('').map(Number);
    return digits
        .filter((digit, index) => digit === digits[(index + 1) % digits.length])
        .reduce((sum, digit) => sum + digit, 0);
};
