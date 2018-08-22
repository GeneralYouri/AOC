const recurse = require('./recurse');

module.exports = (input) => {
    const components = input.split(/\n/g).map(line => line.split(/\//g).map(Number).sort((a, b) => a - b)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    const bridges = [];
    components.forEach(([port1, port2], index) => {
        if (port1 === 0) {
            recurse(bridges, port1 + port2, 1, port2, components.filter((_, i) => i !== index));
        }
    });

    return bridges.reduce((acc, [weight]) => Math.max(acc, weight), 0);
};
