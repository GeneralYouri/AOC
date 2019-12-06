const Intcode = require('./intcode');

module.exports = (input, override = true) => {
    const integers = input.split(/,/g).map(Number);
    if (override) {
        integers[1] = 12;
        integers[2] = 2;
    }
    const runner = new Intcode(integers);
    runner.run();
    return runner.mem[0];
};
