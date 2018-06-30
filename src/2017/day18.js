const { defInput } = require('./input18.js');

function part1(instructions) {
    const registers = [...Array(26)].reduce((acc, value, index) => {
        acc[String.fromCharCode(index + 97)] = 0;
        return acc;
    }, {});

    const parseValue = value => ((typeof value === 'string') ? registers[value] : value);

    let lastSound;

    for (let i = 0; i >= 0 && i < instructions.length; i += 1) {
        const [type, ...params] = instructions[i];

        switch (type) {
            case 'snd': {
                lastSound = parseValue(params[0]);
                break;
            }
            case 'set': {
                registers[params[0]] = parseValue(params[1]);
                break;
            }
            case 'add': {
                registers[params[0]] += parseValue(params[1]);
                break;
            }
            case 'mul': {
                registers[params[0]] *= parseValue(params[1]);
                break;
            }
            case 'mod': {
                registers[params[0]] %= parseValue(params[1]);
                break;
            }
            case 'rcv': {
                if (parseValue(params[0]) !== 0) {
                    return lastSound;
                }
                break;
            }
            case 'jgz': {
                if (parseValue(params[0]) > 0) {
                    i += parseValue(params[1]) - 1;
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    return null;
}

function Program(id, instructions) {
    this.id = id;
    this.instructions = instructions;

    this.registers = [...Array(26)].reduce((acc, value, index) => {
        acc[String.fromCharCode(index + 97)] = 0;
        return acc;
    }, {});
    this.registers.p = this.id;
    this.currentInstruction = 0;

    this.queue = [];
    this.sentValues = 0;
}

Program.prototype.enqueue = function enqueue(value) {
    this.queue.push(value);
};

Program.prototype.parseValue = function parseValue(value) {
    return (typeof value === 'string') ? this.registers[value] : value;
};

Program.prototype.step = function step() {
    const [type, ...params] = this.instructions[this.currentInstruction];
    this.currentInstruction += 1;

    switch (type) {
        case 'snd': {
            this.sentValues += 1;
            return this.parseValue(params[0]);
        }
        case 'set': {
            this.registers[params[0]] = this.parseValue(params[1]);
            break;
        }
        case 'add': {
            this.registers[params[0]] += this.parseValue(params[1]);
            break;
        }
        case 'mul': {
            this.registers[params[0]] *= this.parseValue(params[1]);
            break;
        }
        case 'mod': {
            this.registers[params[0]] %= this.parseValue(params[1]);
            break;
        }
        case 'rcv': {
            if (this.queue.length === 0) {
                this.currentInstruction -= 1;
                return null;
            }
            this.registers[params[0]] = this.queue.shift();
            break;
        }
        case 'jgz': {
            if (this.parseValue(params[0]) > 0) {
                this.currentInstruction += this.parseValue(params[1]) - 1;
            }
            break;
        }
        default: {
            break;
        }
    }
    return undefined;
};

function part2(instructions) {
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

        const value = program.step();
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
}

function test(input = defInput) {
    const parsed = input.split(/\n/g).map(line => line.split(/\s/g).map(value => ((Number.isNaN(Number(value))) ? value : Number(value))));

    console.log('Part 1 answer', part1(parsed));
    console.log('Part 2 answer', part2(parsed));
}

exports.part1 = part1;
exports.part2 = part2;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
