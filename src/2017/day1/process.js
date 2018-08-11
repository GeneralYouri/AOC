module.exports = (digits, getNextDigit) => {
    return digits
        .filter((digit, index) => digit === getNextDigit(index))
        .reduce((sum, digit) => sum + digit, 0);
};
