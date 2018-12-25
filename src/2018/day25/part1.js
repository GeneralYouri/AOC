const manhattan = ([w1, x1, y1, z1], [w2, x2, y2, z2]) => {
    return Math.abs(w2 - w1) + Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1);
};

const merge = (groups) => {
    for (let i = 0; i < groups.length; i += 1) {
        const group1 = groups[i];
        if (group1.length === 0) {
            continue;
        }
        for (let j = i + 1; j < groups.length; j += 1) {
            const group2 = groups[j];
            if (group2.length === 0) {
                continue;
            }
            let done = false;
            for (const p2 of group2) {
                for (const p1 of group1) {
                    const d = manhattan(p1, p2);
                    if (d <= 3) {
                        group1.push(...group2);
                        group2.length = 0;
                        done = true;
                        break;
                    }
                }
                if (done) {
                    break;
                }
            }
        }
    }
    return groups;
};

module.exports = (input) => {
    const points = input.split(/\n/g).map(line => line.split(',').map(Number).map(p => p + 10));

    let groups = points.map(p => [p]);
    let lastLength = Number.POSITIVE_INFINITY;
    while (groups.length < lastLength) {
        lastLength = groups.length;
        groups = merge(groups).filter(g => g.length > 0);
    }

    return groups.length;
};
