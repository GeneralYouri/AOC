const recurse = require('./recurse');

module.exports = (input) => {
    const components = input.split(/\n/g).map(line => line.split(/\//g).map(Number).sort((a, b) => a - b)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    const bridges = [];
    components.forEach(([port1, port2], index) => {
        if (port1 === 0) {
            recurse(bridges, port1 + port2, 1, port2, components.filter((_, i) => i !== index));
        }
    });

    let maxLength = 0;
    let maxWeight = 0;
    for (const [weight, length] of bridges) {
        if (length > maxLength) {
            maxLength = length;
            maxWeight = weight;
        } else if (length === maxLength && weight > maxWeight) {
            maxWeight = weight;
        }
    }

    // max for all components used: 2691
    return maxWeight;
};
