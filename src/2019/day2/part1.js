const intcode = require('./intcode');

const instructions = {
    1: (mem, param1, param2, param3) => { mem[param3] = mem[param1] + mem[param2]; },
    2: (mem, param1, param2, param3) => { mem[param3] = mem[param1] * mem[param2]; },
    99: mem => false,
};

module.exports = (input, override = true) => {
    const integers = input.split(/,/g).map(Number);
    if (override) {
        integers[1] = 12;
        integers[2] = 2;
    }
    const result = intcode(integers, instructions);
    return result[0];
};
