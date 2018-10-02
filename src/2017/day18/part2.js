const Program = require('./program');

module.exports = (input) => {
    const instructions = input.split(/\n/g).map(line => line.split(/\s/g).map(value => ((Number.isNaN(Number(value))) ? value : Number(value))));
    const programs = [
        new Program(0, instructions),
        new Program(1, instructions),
    ];

    const locked = [false, false];

    function step(id) {
        const program = programs[id];

        // Instruction out of bounds locks/terminates the program
        if (program.currentInstruction < 0 || program.currentInstruction >= instructions.length) {
            locked[id] = true;
            return;
        }

        const [type, X, Y] = instructions[program.currentInstruction];
        const value = program.step(type, X, Y);
        if (value === null) {
            // Waiting to receive a value
            locked[id] = true;
        } else if (value !== undefined) {
            // Sending a value
            programs[1 - id].enqueue(value);
        }
    }

    /* eslint-disable no-constant-condition */
    for (let id = 0; true; id = 1 - id) {
        step(id);

        if (locked[0] && locked[1] && programs[0].queue.length === 0 && programs[1].queue.length === 0) {
            break;
        }
    }

    return programs[1].sentValues;
};
