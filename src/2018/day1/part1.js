module.exports = (input) => {
    const deltas = input.split(/\n/g).map(Number);
    return deltas.reduce((frequency, change) => frequency + change, 0);
};
