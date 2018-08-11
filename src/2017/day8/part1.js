const registers = {};

const parseLine = /^(\w+)\s+(inc|dec)\s+(-?\d+)\s+if\s+(\w+)\s+([=!<>]+)\s+(-?\d+)$/;

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

module.exports = (input) => {
    const commands = input.split(/\n/g);

    commands.forEach((commandString) => {
        const [register, operation, amount, ...condition] = parseLine.exec(commandString).slice(1, 7);

        if (!(register in registers)) {
            registers[register] = 0;
        }

        if (checkCondition(...condition)) {
            operations[operation](register, Number(amount));
        }
    });

    return Math.max(...Object.values(registers));
};
