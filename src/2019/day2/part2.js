const intcode = require('./intcode');

const instructions = {
    1: (mem, param1, param2, param3) => { mem[param3] = mem[param1] + mem[param2]; },
    2: (mem, param1, param2, param3) => { mem[param3] = mem[param1] * mem[param2]; },
    99: mem => false,
};

module.exports = (input) => {
    const integers = input.split(/,/g).map(Number);
    for (let noun = 0; noun < 100; noun += 1) {
        for (let verb = 0; verb < 100; verb += 1) {
            integers[1] = noun;
            integers[2] = verb;
            const result = intcode(integers, instructions);
            if (result[0] === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
    return undefined;
};
