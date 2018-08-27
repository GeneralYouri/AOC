const parseLine = /^(\w+)\s+(inc|dec)\s+(-?\d+)\s+if\s+(\w+)\s+([=!<>]+)\s+(-?\d+)$/;

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
    }

    return registers[register];
};

module.exports = (commands, onAfterOperation = () => {}) => {
    const registers = {};

    commands.forEach((commandString) => {
        const [register, operation, amount, ...condition] = parseLine.exec(commandString).slice(1, 7);
        const [conditionRegister, conditionOperation, conditionCompare] = condition;

        const value = getRegister(registers, register);
        const conditionValue = getRegister(registers, conditionRegister);

        const applyCondition = conditions[conditionOperation];
        const applyOperation = operations[operation];

        if (applyCondition(conditionValue, Number(conditionCompare))) {
            registers[register] = applyOperation(value, Number(amount));
        }

        onAfterOperation(registers[register]);
    });

    return registers;
};
