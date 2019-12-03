const defaultInstructions = {
    1: (mem, param1, param2, param3) => { mem[param3] = mem[param1] + mem[param2]; },
    2: (mem, param1, param2, param3) => { mem[param3] = mem[param1] * mem[param2]; },
    99: mem => false,
};

module.exports = (integers, instructions = defaultInstructions) => {
    const mem = integers.slice();
    mem.IP = 0;
    while (mem.IP >= 0 && mem.IP < mem.length) {
        const opcode = mem[mem.IP];
        if (!(opcode in instructions)) {
            throw new Error('Invalid opcode - This means something went wrong');
        }

        const instruction = instructions[opcode];
        const { length } = instruction;
        const params = mem.slice(mem.IP + 1, mem.IP + length);
        if (instruction(mem, ...params) === false) {
            break;
        }
        mem.IP += length;
    }
    return mem;
};
