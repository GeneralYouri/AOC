module.exports = (input) => {
    const deltas = input.split(/\n/g);
    return deltas.reduce((acc, change) => acc + Number(change), 0);
};
