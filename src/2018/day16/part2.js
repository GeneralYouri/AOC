const types = [
    // Addition
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a] + out[b];
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a] + b;
        return out;
    },

    // Multiplication
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a] * out[b];
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a] * b;
        return out;
    },

    // Bitwise AND
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a] & out[b];
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a] & b;
        return out;
    },

    // Bitwise Or
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a] | out[b];
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a] | b;
        return out;
    },

    // Assignment
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = out[a];
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = a;
        return out;
    },

    // Greater-than testing
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = Number(a > out[b]);
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = Number(out[a] > b);
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = Number(out[a] > out[b]);
        return out;
    },

    // Equality testing
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = Number(a === out[b]);
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = Number(out[a] === b);
        return out;
    },
    (reg, a, b, c) => {
        const out = reg.slice();
        out[c] = Number(out[a] === out[b]);
        return out;
    },
];

const matches = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

module.exports = (input) => {
    const [samplesString, program] = input.split('\n\n\n\n');

    const samples = samplesString.split(/\n\n/g).map((str) => {
        const lines = str.split(/\n/g);
        const before = eval(lines[0].slice(8));
        const instruction = lines[1].split(' ').map(Number);
        const after = eval(lines[2].slice(8));
        return [before, instruction, after];
    });

    const candidates = types.map(() => Array.from(new Array(16)).fill(true));

    for (const sample of samples) {
        const [before, [opcode, ...args], after] = sample;
        types.forEach((fn, type) => {
            const result = fn(before, ...args);
            if (!matches(result, after)) {
                candidates[opcode][type] = false;
            }
        });
    }

    const opcodes = [];
    let finished = 0;
    while (finished < 16) {
        for (let from = 0; from < candidates.length; from += 1) {
            if (opcodes[from] !== undefined) {
                continue;
            }
            let code = null;
            let unique = true;
            for (const to in candidates[from]) {
                if (candidates[from][to]) {
                    if (code === null) {
                        code = to;
                    } else {
                        unique = false;
                    }
                }
            }
            if (unique) {
                opcodes[from] = Number(code);
                finished += 1;
                candidates.forEach((remaining) => {
                    remaining[code] = false;
                });
            }
        }
    }

    for (const sample of samples) {
        const [before, [opcode, ...args], after] = sample;
        const fn = types[opcodes[opcode]];
        const result = fn(before, ...args);
        if (!matches(result, after)) {
            console.log('FUCK');
        }
    }

    let registers = [0, 0, 0, 0];
    program.split(/\n/g).forEach((line) => {
        const [opcode, ...args] = line.split(' ').map(Number);
        const translation = opcodes[opcode];
        registers = types[translation](registers, ...args);
    });

    return registers[0];
};
