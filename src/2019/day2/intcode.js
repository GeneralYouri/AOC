/*
TODO:
+ Create an Intcode class to support multiple instances operating separately
+ Use a static list of instructions, new ones can be added there easily
+ Allow instructions to dynamically request parameters, and thus change in length
+ Create a system for instructions to request parameter values, which applies the parameter mode
+ Allow instructions to request user/outside input values as parameters, maybe through an event
+ Allow instructions to output values, maybe through an event
+ Give full control to the caller script and to instructions by supplying them with the full state
+ Allow execution to pause midway, mainly for input/output interactions with other instances
- Implement debug options like stepping one instruction at a time, or inspecting part of the memory
+ Implement opcode translations that translate the opcodes and their actions to human readable text
- Theoretical support for more opcode types:
    - A function-style opcode which moves to a given IP, and when finished returns back to the old IP
      This can be solved by keeping an IP stack to remember where you came from
    - An opcode that "virtually transforms itself" into a different opcode conditionally
      It essentially changes its own opcode, runs the opcode, and undoes this action afterwards
    - A variable-length opcode that consumes a variable number of parameters
      For example by using parameter 1 as the parameter count or by conditional branching with different counts
    - An opcode that simulates specific actions (other opcodes?) and takes action based on the result, but this result is not persisted
      This can be solved by keeping statechange history, enabling moving back and forth per instruction
- Add more TODOs
 */

(() => {
    class Instruction {
        constructor(opcode, length, paramTypes, run) {
            this.opcode = opcode;
            this.length = length;
            this.paramTypes = paramTypes;
            this.run = run;
        }
    }

    const paramModes = Object.freeze({
        POSITION: '0',
        IMMEDIATE: '1',
        RELATIVE: '2',
    });

    const opcodes = Object.freeze({
        ADD: 1,
        MUL: 2,
        IN: 3,
        OUT: 4,
        JNZ: 5,
        JEZ: 6,
        LT: 7,
        EQ: 8,
        REL: 9,
        HALT: 99,
    });

    const instructions = {
        [opcodes.ADD]: new Instruction(1, 3, 0b100, async function op1(instance, param1, param2, param3) {
            const value1 = instance.read(param1);
            const value2 = instance.read(param2);
            instance.write(param3, value1 + value2);
            instance.moveBy(4);
            instance.debugLog(`${this.opcode}: ${instance.read(param3)} = ${value1} + ${value2}`);
        }),
        [opcodes.MUL]: new Instruction([opcodes.MUL], 3, 0b100, async function op2(instance, param1, param2, param3) {
            const value1 = instance.read(param1);
            const value2 = instance.read(param2);
            instance.write(param3, value1 * value2);
            instance.moveBy(4);
            instance.debugLog(`${this.opcode}: ${instance.read(param3)} = ${value1} * ${value2}`);
        }),
        [opcodes.IN]: new Instruction([opcodes.IN], 1, 0b1, async function op3(instance, param1) {
            const shouldPause = await instance.stdin(instance.inputIndex);
            if (shouldPause === null) {
                return false;
            }

            instance.write(param1, shouldPause);
            instance.inputIndex += 1;
            instance.moveBy(2);
            instance.debugLog(`${this.opcode}: IN ${instance.read(param1)}`);
        }),
        [opcodes.OUT]: new Instruction([opcodes.OUT], 1, 0b0, async function op4(instance, param1) {
            const value1 = instance.read(param1);
            const shouldPause = await instance.stdout(value1, instance.outputIndex);
            instance.outputIndex += 1;
            instance.moveBy(2);
            instance.debugLog(`${this.opcode}: OUT ${value1}`);
            if (shouldPause === null) {
                return false;
            }
        }),
        [opcodes.JNZ]: new Instruction([opcodes.JNZ], 2, 0b00, async function op5(instance, param1, param2) {
            const value1 = instance.read(param1);
            if (value1 !== 0) {
                instance.moveTo(instance.read(param2));
                instance.debugLog(`${this.opcode}: (${value1} !== 0) = true => IP = ${instance.IP}`);
            } else {
                instance.moveBy(3);
                instance.debugLog(`${this.opcode}: (${value1} !== 0) = false => IP = ${instance.IP}`);
            }
        }),
        [opcodes.JEZ]: new Instruction([opcodes.JEZ], 2, 0b00, async function op6(instance, param1, param2) {
            const value1 = instance.read(param1);
            if (value1 === 0) {
                instance.moveTo(instance.read(param2));
                instance.debugLog(`${this.opcode}: (${value1} === 0) = true => IP = ${instance.IP}`);
            } else {
                instance.moveBy(3);
                instance.debugLog(`${this.opcode}: (${value1} === 0) = false => IP = ${instance.IP}`);
            }
        }),
        [opcodes.LT]: new Instruction([opcodes.LT], 3, 0b100, async function op7(instance, param1, param2, param3) {
            const value1 = instance.read(param1);
            const value2 = instance.read(param2);
            if (value1 < value2) {
                instance.write(param3, 1);
                instance.debugLog(`${this.opcode}: ${instance.read(param3)} = (${value1} < ${value2}) = true => 1`);
            } else {
                instance.write(param3, 0);
                instance.debugLog(`${this.opcode}: ${instance.read(param3)} = (${value1} < ${value2}) = false => 0`);
            }
            instance.moveBy(4);
        }),
        [opcodes.EQ]: new Instruction([opcodes.EQ], 3, 0b100, async function op8(instance, param1, param2, param3) {
            const value1 = instance.read(param1);
            const value2 = instance.read(param2);
            if (value1 === value2) {
                instance.write(param3, 1);
                instance.debugLog(`${this.opcode}: ${instance.read(param3)} = (${value1} === ${value2}) = true => 1`);
            } else {
                instance.write(param3, 0);
                instance.debugLog(`${this.opcode}: ${instance.read(param3)} = (${value1} < ${value2}) = false => 0`);
            }
            instance.moveBy(4);
        }),
        [opcodes.REL]: new Instruction([opcodes.REL], 1, 0b0, async function op9(instance, param1) {
            const value1 = instance.read(param1);
            instance.relativeBase += value1;
            instance.moveBy(2);
            instance.debugLog(`${this.opcode}: RelativeBase += ${value1}`);
        }),
        [opcodes.HALT]: new Instruction([opcodes.HALT], 0, 0b0, async function op99(instance) {
            instance.moveBy(1);
            instance.isFinished = true;
            instance.debugLog(`${this.opcode}: HALT`);
            return false;
        }),
    };

    const noop = () => {};

    class Intcode {
        constructor(integers, options = {}) {
            this.mem = integers.slice();
            this.IP = 0;
            this.stdin = options.stdin || noop;
            this.stdout = options.stdout || noop;
            this.instructionCallback = options.instructionCallback || noop;
            this.inputIndex = 0;
            this.outputIndex = 0;
            this.isFinished = false;
            this.relativeBase = 0;
            this.debug = options.debug || false;
        }

        async run(steps = Number.POSITIVE_INFINITY) {
            for (let step = 0; this.IP >= 0 && step < steps; step += 1) {

                const param0 = this.mem[this.IP];
                const modes = Math.trunc(param0 / 100).toString();
                const opcode = param0 - 100 * modes;
                if (!(opcode in instructions)) {
                    throw new Error('Invalid opcode - This means something went wrong');
                }

                const instruction = instructions[opcode];
                const params = this.resolveParams(instruction, modes);
                // this.debugLog('pre', param0, this.mem.slice(this.IP + 1, this.IP + 1 + instruction.length), params);
                // console.log('pre', param0, this.mem.slice(this.IP + 1, this.IP + 1 + instruction.length), params);
                const result = await instruction.run(this, ...params);
                // console.log('post', this.mem);
                // this.debugLog('post', this.mem);
                this.instructionCallback();
                if (result === false) {
                    break;
                }
            }
            return this;
        }

        resolveParams(instruction, modes) {
            const params = [];
            for (let i = 0; i < instruction.length; i += 1) {
                const mode = modes[modes.length - 1 - i] || '0';
                const type = instruction.paramTypes & (1 << i);
                if (!type && mode === paramModes.IMMEDIATE) {
                    params.push(this.IP + 1 + i);
                } else if (mode === paramModes.POSITION) {
                    params.push(this.mem[this.IP + 1 + i]);
                } else if (mode === paramModes.RELATIVE) {
                    params.push(this.mem[this.IP + 1 + i] + this.relativeBase);
                } else {
                    throw new Error(`Invalid Parameter Mode (${mode}) or Type (${type})`);
                }
            }
            return params;
        }

        read(index) {
            return this.mem[index];
        }

        write(index, value) {
            this.mem[index] = value;
        }

        moveBy(offset) {
            if (this.IP + offset < 0) {
                throw new Error('Illegal IP value: ' + (this.IP + offset));
            }
            this.IP += offset;
        }

        moveTo(index) {
            if (index < 0) {
                throw new Error('Illegal IP value: ' + index);
            }
            this.IP = index;
        }

        debugLog(...logs) {
            if (this.debug) {
                console.log(...logs);
            }
        }
    }

    module.exports.Intcode = Intcode;
})();

const batchInput = (batches, fns) => {
    if (!Array.isArray(batches)) {
        batches = [batches];
    }
    if (!Array.isArray(fns)) {
        fns = batches.map(() => fns);
    }

    let values = [];
    let index = 0;
    return () => {
        if (values.length === 0) {
            const batchIndex = index % batches.length;
            values = fns[batchIndex](index);
            index += 1;
        }
        return values.shift();
    };
};

const batchOutput = (batches, fns) => {
    if (!Array.isArray(batches)) {
        batches = [batches];
    }
    if (!Array.isArray(fns)) {
        fns = batches.map(() => fns);
    }

    let values = [];
    let index = 0;
    return (output) => {
        values.push(output);
        const batchIndex = index % batches.length;
        if (values.length === batches[batchIndex]) {
            fns[batchIndex](...values, index);
            values = [];
            index += 1;
        }
    };
};

const queueInput = queue => () => queue.shift();
const queueOutput = queue => value => queue.push(value);

module.exports.batchInput = batchInput;
module.exports.batchOutput = batchOutput;
module.exports.queueInput = queueInput;
module.exports.queueOutput = queueOutput;
