const { defInput } = require('./input.js');

function parts(sheet) {
    let sum1 = 0;
    let sum2 = 0;

    sheet.forEach((row) => {
        let lowest = Infinity;
        let highest = -Infinity;

        row.forEach((value1) => {
            if (value1 < lowest) {
                lowest = value1;
            }
            if (value1 > highest) {
                highest = value1;
            }

            row.forEach((value2) => {
                if (value1 !== value2 && value1 % value2 === 0) {
                    sum2 += value1 / value2;
                }
            });
        });

        sum1 += highest - lowest;
    });

    return { sum1, sum2 };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(row => row.split(/\t/).map(Number));

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.sum1);
    console.log('Part 2 answer', answer.sum2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
