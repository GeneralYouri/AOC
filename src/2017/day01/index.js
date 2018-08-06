const { defInput } = require('./input.js');

function parts(digitString) {
    const digits = digitString.split('').map(Number);
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < digits.length; i += 1) {
        if (digits[i] === digits[(i + 1) % digits.length]) {
            sum1 += digits[i];
        }
        if (digits[i] === digits[(i + digits.length / 2) % digits.length]) {
            sum2 += digits[i];
        }
    }

    return { sum1, sum2 };
}

function test(input = defInput) {
    const answer = parts(input);
    console.log('Part 1 answer', answer.sum1);
    console.log('Part 2 answer', answer.sum2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
