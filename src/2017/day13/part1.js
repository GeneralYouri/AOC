module.exports = (input) => {
    const scanners = input.split(/\n/g).map(value => value.split(': ').map(Number));

    return scanners.reduce((severity, [depth, range]) => {
        const cycle = range * 2 - 2;
        const caught = depth % cycle === 0;
        return caught ? severity + depth * range : severity;
    }, 0);
};
