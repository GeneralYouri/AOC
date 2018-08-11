module.exports = (offsets, deltaOffset) => {
    let steps = 0;
    let i = 0;
    while (i >= 0 && i < offsets.length) {
        const offset = offsets[i];
        offsets[i] += deltaOffset(offset);

        i += offset;
        steps += 1;
    }

    return steps;
};
