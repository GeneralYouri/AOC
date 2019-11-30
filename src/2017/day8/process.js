const parseLine = /^(\w+) (inc|dec) (-?\d+) if (\w+) ([=!<>]+) (-?\d+)$/;

const conditions = {
    '==': (value, compare) => value === compare,
    '!=': (value, compare) => value !== compare,
    '<=': (value, compare) => value <= compare,
    '>=': (value, compare) => value >= compare,
    '<': (value, compare) => value < compare,
    '>': (value, compare) => value > compare,
};

const operations = {
    inc: (value, amount) => value + amount,
    dec: (value, amount) => value - amount,
};

const getRegister = (registers, register) => {
    if (!(register in registers)) {
        registers[register] = 0;
        return 0;
    }

    return registers[register];
};

module.exports = (commands, onAfterOperation = () => {}) => {
    const registers = {};

    commands.forEach((commandString) => {
        const [register, operation, amount, ...condition] = parseLine.exec(commandString).slice(1, 7);
        const [cndRegister, cndOperation, cndCompare] = condition;

        const value = getRegister(registers, register);
        const cndValue = getRegister(registers, cndRegister);

        const applyCondition = conditions[cndOperation];
        if (applyCondition(cndValue, Number(cndCompare))) {
            const applyOperation = operations[operation];
            registers[register] = applyOperation(value, Number(amount));
            onAfterOperation(registers[register]);
        }
    });

    return registers;
};
