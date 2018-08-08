module.exports = (input) => {
    const square = Number(input);

    const index = Math.ceil((Math.sqrt(square) + 1) / 2) - 1;
    const edge = index * 2 + 1;

    return index + Math.abs(index + ((square - edge * edge) % Math.max(edge - 1, 1)));
};
