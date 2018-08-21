module.exports = (input) => {
    const jump = Number(input);

    let result = 0;
    let pos = 0;

    for (let i = 0; i <= 50000000; pos += 1) {
        if (pos === 1) {
            result = i;
        }

        const skip = Math.floor((i - pos) / jump) + 1;
        i += skip;
        pos += skip * (jump + 1) - 1;
        pos %= i;
    }

    return result;
};
