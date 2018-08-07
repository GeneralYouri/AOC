const { defInput } = require('./input.js');

let registers = {};

const conditions = {
    '==': (register, value) => registers[register] === value,
    '!=': (register, value) => registers[register] !== value,
    '<=': (register, value) => registers[register] <= value,
    '>=': (register, value) => registers[register] >= value,
    '<': (register, value) => registers[register] < value,
    '>': (register, value) => registers[register] > value,
};

const operations = {
    inc: (register, amount) => { registers[register] += amount; },
    dec: (register, amount) => { registers[register] -= amount; },
};

function checkCondition(register, operation, value) {
    if (!(register in registers)) {
        registers[register] = 0;
    }

    return conditions[operation](register, Number(value));
}

function parts(commandStrings) {
    registers = {};
    let highestValue = 0;

    for (let i = 0; i < commandStrings.length; i += 1) {
        const str = commandStrings[i];
        const [register, operation, amount, ...condition] = /^(\w+)\s+(inc|dec)\s+(-?\d+)\s+if\s+(\w+)\s+([=!<>]+)\s+(-?\d+)$/.exec(str).slice(1, 7);

        if (!(register in registers)) {
            registers[register] = 0;
        }

        if (checkCondition(...condition)) {
            operations[operation](register, Number(amount));
        }

        const newValue = registers[register];
        if (newValue >= highestValue) {
            highestValue = newValue;
        }
    }

    return { part1: Math.max(...Object.values(registers)), part2: highestValue };
}

function test(input = defInput) {
    const parsed = input.split(/\n/g);

    const answer = parts(parsed);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
