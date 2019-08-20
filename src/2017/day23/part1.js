module.exports = (input) => {
    const instructions = input.split(/\n/g).map(line => line.split(/\s/g).map(value => (Number.isNaN(Number(value)) ? value : Number(value))));
    const registers = [];
    for (let i = 0; i < 8; i += 1) {
        registers[i + 97] = 0;
    }

    const parseValue = value => ((typeof value === 'string') ? registers[value.charCodeAt(0)] : value);

    let mulCount = 0;
    for (let i = 0; i >= 0 && i < instructions.length; i += 1) {
        const params = instructions[i];
        const type = params[0];
        const key = params[1];
        const value = parseValue(params[2]);

        if (type === 'set') {
            registers[key.charCodeAt(0)] = value;
        } else if (type === 'sub') {
            registers[key.charCodeAt(0)] -= value;
        } else if (type === 'mul') {
            registers[key.charCodeAt(0)] *= value;
            mulCount += 1;
        } else { // if (type === 'jnz') {
            if (parseValue(key) !== 0) {
                i += value - 1;
            }
        }
    }
    return mulCount;
};
