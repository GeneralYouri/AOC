module.exports = (input) => {
    const deltas = input.split(/\n/g).map(Number);
    const seen = new Set();
    let frequency = 0;

    while (true) {
        for (const delta of deltas) {
            seen.add(frequency);
            frequency += delta;
            if (seen.has(frequency)) {
                return frequency;
            }
        }
    }
};

module.exports = (input) => {
    const deltas = input.split(/\n/g).map(Number);
    const seen = {};
    let frequency = 0;

    while (true) {
        for (let i = 0; i < deltas.length; i += 1) {
            seen[frequency] = true;
            frequency += deltas[i];
            if (seen[frequency]) {
                return frequency;
            }
        }
    }
};
