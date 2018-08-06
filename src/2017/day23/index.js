const { defInput } = require('./input.js');

function part1(instructions) {
    const registers = [...Array(8)].reduce((acc, value, index) => {
        acc[String.fromCharCode(index + 97)] = 0;
        return acc;
    }, {});

    const parseValue = value => ((typeof value === 'string') ? registers[value] : value);

    let mulCount = 0;

    for (let i = 0; i >= 0 && i < instructions.length; i += 1) {
        const [type, ...params] = instructions[i];

        switch (type) {
            case 'set': {
                registers[params[0]] = parseValue(params[1]);
                break;
            }
            case 'sub': {
                registers[params[0]] -= parseValue(params[1]);
                break;
            }
            case 'mul': {
                registers[params[0]] *= parseValue(params[1]);
                mulCount += 1;
                break;
            }
            case 'jnz': {
                if (parseValue(params[0]) !== 0) {
                    i += parseValue(params[1]) - 1;
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    return mulCount;
}

// A rare case where we needed to program for just our input, and no other, as such this will not work for other inputs
// The input (a list of assembly-like instructions) is converted into a functionally equivalent, but faster (lower time complexity), JS program
function part2() {
    let h = 0;

    for (let b = 108400; b <= 125400; b += 17) {
        for (let d = 2; d < b; d += 1) {
            if (b % d === 0) {
                h += 1;
                break;
            }
        }
    }

    return h;
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(line => line.split(/\s/g).map(value => ((Number.isNaN(Number(value))) ? value : Number(value))));

    console.log('Part 1 answer', part1(parsed));
    console.log('Part 2 answer', part2(parsed));
}

exports.part1 = part1;
exports.part2 = part2;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
