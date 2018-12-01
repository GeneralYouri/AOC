module.exports = (input) => {
    const deltas = input.split(/\n/g);
    const seen = {};
    let frequency = 0;

    while (true) {
        for (const delta of deltas) {
            seen[frequency] = true;
            frequency += Number(delta);
            if (seen[frequency]) {
                return frequency;
            }
        }
    }
};
