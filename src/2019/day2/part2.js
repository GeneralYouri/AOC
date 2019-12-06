const Intcode = require('./intcode');

module.exports = (input) => {
    const integers = input.split(/,/g).map(Number);
    for (let noun = 0; noun < 100; noun += 1) {
        for (let verb = 0; verb < 100; verb += 1) {
            integers[1] = noun;
            integers[2] = verb;
            const runner = new Intcode(integers);
            runner.run();
            if (runner.mem[0] === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
    return undefined;
};
