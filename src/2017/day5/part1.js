module.exports = (input) => {
    const offsets = input.split(/\n/g).map(Number).slice();

    let steps = 0;
    for (let i = 0; i >= 0 && i < offsets.length; steps += 1) {
        const offset = offsets[i];
        offsets[i] += 1;
        i += offset;
    }

    return steps;
};
