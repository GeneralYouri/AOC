// We can theoretically use our own formula and leave out the `sqrt`, even replace the `** 2` with `Math.abs`, but neither seemed to meaningfully influence performance
const getManhattanDistance = p => Math.hypot(...p);

// TODO: This doesn't work for all inputs; consider two particles `A=1, V=1, P=0` and `A=1, V=-2, P=0`
module.exports = (input) => {
    // Per particle: [position, velocity, acceleration]
    const particles = input.split(/\n/g).map(line => line.match(/<.*?>/g).map(coord => coord.slice(1, -1).split(',').map(Number)));

    // Essentially requires sorting on acceleration, except for cases with equal accelerations
    // While this doesn't occur in my puzzle input, it does in others' inputs, thus we have to account for these cases
    let lowestA = Number.POSITIVE_INFINITY;
    let lowestV = Number.POSITIVE_INFINITY;
    let lowestP = Number.POSITIVE_INFINITY;
    return particles.reduce((closestId, particle, id) => {
        const manhattanA = getManhattanDistance(particle[2]); // acceleration
        const manhattanV = getManhattanDistance(particle[1]); // velocity
        const manhattanP = getManhattanDistance(particle[0]); // position

        if (manhattanA < lowestA || (manhattanA === lowestA && (manhattanV < lowestV || (manhattanV === lowestV && manhattanP < lowestP)))) {
            lowestA = manhattanA;
            lowestV = manhattanV;
            lowestP = manhattanP;
            return id;
        }
        return closestId;
    }, null);
};
