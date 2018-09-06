const recurse = (bridges, weight, length, endPort, remaining) => {
    let isFinished = true;

    remaining.forEach(([port1, port2], index) => {
        if (port1 === endPort || port2 === endPort) {
            const newEndPort = (port1 === endPort) ? port2 : port1;
            isFinished = false;
            recurse(bridges, weight + port1 + port2, length + 1, newEndPort, remaining.filter((_, i) => i !== index));
        }
    });

    if (isFinished) {
        bridges.push([weight, length]);
    }
};

module.exports = recurse;
