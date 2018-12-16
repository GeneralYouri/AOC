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
    const [samplesString, _] = input.split('\n\n\n\n');

    const samples = samplesString.split(/\n\n/g).map((str) => {
        const lines = str.split(/\n/g);
        const before = eval(lines[0].slice(8));
        const instruction = lines[1].split(' ').map(Number);
        const after = eval(lines[2].slice(8));
        return [before, instruction, after];
    });

    let count = 0;
    for (const sample of samples) {
        const [before, [opcode, ...args], after] = sample;
        let valid = 0;
        types.forEach((fn) => {
            const result = fn(before, ...args);
            if (matches(result, after)) {
                valid += 1;
            }
        });
        if (valid >= 3) {
            count += 1;
        }
    }

    return count;
};
