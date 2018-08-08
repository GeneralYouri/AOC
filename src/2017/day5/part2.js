module.exports = (input) => {
    const offsets = input.split(/\n/g).map(Number);

    let steps = 0;
    let i = 0;
    while (i >= 0 && i < offsets.length) {
        const offset = offsets[i];
        if (offset >= 3) {
            offsets[i] -= 1;
        } else {
            offsets[i] += 1;
        }

        i += offset;
        steps += 1;
    }

    return steps;
};
