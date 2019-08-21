const process = (input, cb) => {
    const components = input.split(/\n/g).map(line => line.split(/\//g).map(Number));
    const componentsByPort = Array.from(Array(51)).map(() => []);

    for (let i = 0; i < components.length; i += 1) {
        const component = components[i];
        const portA = component[0];
        const portB = component[1];
        const c = [portA + portB, false];
        componentsByPort[portA].push(c);
        if (portA !== portB) {
            componentsByPort[portB].push(c);
        }
    }

    const recurse = (weight, length, endPort) => {
        cb(weight, length);
        for (let i = 0; i < componentsByPort[endPort].length; i += 1) {
            const component = componentsByPort[endPort][i];
            if (!component[1]) {
                component[1] = true;
                recurse(weight + component[0], length + 1, component[0] - endPort);
                component[1] = false;
            }
        }
    };
    recurse(0, 0, 0);
};

module.exports = process;
