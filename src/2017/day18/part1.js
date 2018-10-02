const Program = require('./program');

module.exports = (input) => {
    const instructions = input.split(/\n/g).map(line => line.split(/\s/g).map(value => ((Number.isNaN(Number(value))) ? value : Number(value))));
    const program = new Program(0, instructions);

    /* eslint-disable no-constant-condition */
    while (true) {
        const [type, X, Y] = instructions[program.currentInstruction];
        const check = type === 'rcv';

        program.step(type, X, Y);
        if (check) {
            return program.lastValue;
        }
    }
};
