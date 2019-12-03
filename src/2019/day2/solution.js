const doPart1 = (mem) => {
    mem[1] = 12;
    mem[2] = 2;
    for (let i = 0; i < mem.length; i += 4) {
        const opcode = mem[i];
        if (opcode === 1) {
            mem[mem[i + 3]] = mem[mem[i + 1]] + mem[mem[i + 2]];
        } else if (opcode === 2) {
            mem[mem[i + 3]] = mem[mem[i + 1]] * mem[mem[i + 2]];
        } else if (opcode === 99) {
            break;
        }
    }
    return mem[0];
};

const doPart2 = (integers) => {
    for (let noun = 0; noun < 100; noun += 1) {
        for (let verb = 0; verb < 100; verb += 1) {
            const mem = integers.slice();
            mem[1] = noun;
            mem[2] = verb;
            for (let i = 0; i < mem.length; i += 4) {
                const opcode = mem[i];
                if (opcode === 1) {
                    mem[mem[i + 3]] = mem[mem[i + 1]] + mem[mem[i + 2]];
                } else if (opcode === 2) {
                    mem[mem[i + 3]] = mem[mem[i + 1]] * mem[mem[i + 2]];
                } else if (opcode === 99) {
                    if (mem[0] === 19690720) {
                        return 100 * noun + verb;
                    }
                    break;
                }
            }
        }
    }
    return undefined;
};

module.exports = (input) => {
    const integers = input.split(/,/g).map(Number);
    const part1 = doPart1(integers.slice());
    const part2 = doPart2(integers);
    return [part1, part2];
};
