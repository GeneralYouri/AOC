/*
TODO:
+ Create an Intcode class to support multiple instances operating separately
+ Use a static list of instructions, new ones can be added there easily
+ Allow instructions to dynamically request parameters, and thus change in length
+ Create a system for instructions to request parameter values, which applies the parameter mode
+ Allow instructions to request user/outside input values as parameters, maybe through an event
+ Allow instructions to output values, maybe through an event
+ Give full control to the caller script and to instructions by supplying them with the full state
- Implement debug options like stepping one instruction at a time, or inspecting part of the memory
- Implement translation function that translates an Intcode program to human readable text
 */

const instructions = {
    1: (state, params) => {
        params.set(3, params.get(1) + params.get(2));
        state.moveBy(4);
        // console.log(`${param3} = ${param1} + ${param2}`);
    },
    2: (state, params) => {
        params.set(3, params.get(1) * params.get(2));
        state.moveBy(4);
        // console.log(`${param3} = ${param1} * ${param2}`);
    },
    3: (state, params) => {
        params.set(1, state.stdin()); // TODO: input
        state.moveBy(2);
    },
    4: (state, params) => {
        state.stdout(params.get(1)); // TODO: output
        state.moveBy(2);
    },
    5: (state, params) => {
        if (params.get(1) !== 0) {
            state.moveTo(params.get(2));
        } else {
            state.moveBy(3);
        }
    },
    6: (state, params) => {
        if (params.get(1) === 0) {
            state.moveTo(params.get(2));
        } else {
            state.moveBy(3);
        }
    },
    7: (state, params) => {
        params.set(3, (params.get(1) < params.get(2)) ? 1 : 0);
        state.moveBy(4);
    },
    8: (state, params) => {
        params.set(3, (params.get(1) === params.get(2)) ? 1 : 0);
        state.moveBy(4);
    },
    99: (state, params) => {
        state.moveBy(1);
        return false;
    },
};

const noop = () => {};

class Params {
    constructor(interpreter, modes) {
        this.interpreter = interpreter;
        this.modes = modes;
    }

    get(offset, mode) {
        return this.interpreter.read(this.interpreter.IP + offset, mode || (this.modes & (1 << (offset - 1))));
    }

    set(offset, value) {
        this.interpreter.write(this.interpreter.IP + offset, value);
    }

    getAbs(index) {
        return this.interpreter.read(index, 0);
    }

    setAbs(index, value) {
        this.interpreter.write(index, value);
    }
}

class Interpreter {
    constructor(integers, options = {}) {
        this.mem = integers.slice();
        this.IP = 0;
        this.stdin = options.stdin || noop;
        this.stdout = options.stdout || noop;
    }

    run() {
        while (this.IP >= 0 && this.IP < this.mem.length) {
            const param0 = this.mem[this.IP];
            const opcode = param0 % 100;
            const modes = (param0 - opcode) / 100;
            if (!(opcode in instructions)) {
                throw new Error('Invalid opcode - This means something went wrong');
            }

            const instruction = instructions[opcode];
            const params = new Params(this, modes);
            const result = instruction(this, params);
            if (result === false) {
                break;
            }
        }
        return this;
    }

    read(index, mode = 0) {
        const value = this.mem[index];
        return mode === 0 ? this.mem[value] : value;
    }

    write(index, value) {
        const writeIndex = this.read(index, 1);
        this.mem[writeIndex] = value;
    }

    moveBy(offset) {
        this.IP += offset;
    }

    moveTo(index) {
        this.IP = index;
    }
}

module.exports = Interpreter;
