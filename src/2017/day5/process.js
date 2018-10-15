module.exports = (offsets, offsetLimit) => {
    let steps = 0;
    let i = 0;

    while (i >= 0 && i < offsets.length) {
        const offset = offsets[i];
        offsets[i] += offset < offsetLimit ? 1 : -1;

        i += offset;
        steps += 1;
    }

    return steps;
};
