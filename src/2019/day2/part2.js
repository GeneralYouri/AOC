const { Intcode } = require('./intcode');

module.exports = async (input) => {
    const integers = input.split(/,/g).map(Number);
    for (let noun = 0; noun < 100; noun += 1) {
        for (let verb = 0; verb < 100; verb += 1) {
            integers[1] = noun;
            integers[2] = verb;
            const program = new Intcode(integers);
            await program.run();
            if (program.mem[0] === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
    return undefined;
};
