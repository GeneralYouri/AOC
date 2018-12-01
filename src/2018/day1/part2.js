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
