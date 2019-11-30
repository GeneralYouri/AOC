module.exports = (input) => {
    const halfLength = input.length / 2;
    const digits = (input + input[0]).split('').map(Number);

    let part1 = 0;
    let part2 = 0;
    for (let i = 0; i < 2 * halfLength - 1; i += 1) {
        const digit = digits[i];
        // Part 1 compares the digit to the next digit
        if (digit === digits[i + 1]) {
            part1 += digit;
        }
        // Part 2 compares the digit to the opposite digit, which is halfway around the list
        if (digit === digits[(i + halfLength) % (2 * halfLength)]) {
            part2 += digit;
        }
    }
    return [part1, part2];
};
