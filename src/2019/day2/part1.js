const { Intcode } = require('./intcode');

module.exports = async (input, override = true) => {
    const integers = input.split(/,/g).map(Number);
    if (override) {
        integers[1] = 12;
        integers[2] = 2;
    }
    const program = new Intcode(integers);
    await program.run();
    return program.mem[0];
};
