// module.exports = (input) => {
//     const deltas = input.split(/\n/g).map(Number);
//     const seen = new Set();
//     let frequency = 0;
//
//     while (true) {
//         for (const delta of deltas) {
//             seen.add(frequency);
//             frequency += delta;
//             if (seen.has(frequency)) {
//                 return frequency;
//             }
//         }
//     }
// };

// module.exports = (input) => {
//     const deltas = input.split(/\n/g).map(Number);
//     const seen = {};
//     let frequency = 0;
//
//     for (let i = 0; i < deltas.length; i += 1) {
//         seen[frequency] = true;
//         frequency += deltas[i];
//         if (seen[frequency]) {
//             return frequency;
//         }
//     }
//
//     const cycleDelta = frequency;
//     if (cycleDelta === 0) {
//         return 0;
//     }
//
//     while (true) {
//         for (let i = 0; i < deltas.length; i += 1) {
//             frequency += deltas[i];
//             if (seen[frequency]) {
//                 return frequency;
//             }
//         }
//     }
// };

module.exports = (input) => {
    const deltas = input.split(/\n/g).map(Number);
    const frequencies = [];
    const seen = {};
    let frequency = 0;

    for (let i = 0; i < deltas.length; i += 1) {
        frequencies.push(frequency);
        seen[frequency] = true;
        frequency += deltas[i];
        if (seen[frequency]) {
            return frequency;
        }
    }

    const cycleDelta = frequency;
    if (cycleDelta === 0) {
        return 0;
    }

    const groupedByMod = Array.from(Array(cycleDelta)).map(() => []);
    for (let i = 0; i < frequencies.length; i += 1) {
        const groupId = (frequencies[i] % cycleDelta + cycleDelta) % cycleDelta;
        groupedByMod[groupId].push(i);
    }
    groupedByMod.forEach(group => group.sort((a, b) => a - b));

    let best = Number.POSITIVE_INFINITY;
    let bestIndex = Number.POSITIVE_INFINITY;
    let bestValue = -1;
    for (let i = 0; i < groupedByMod.length; i += 1) {
        const group = groupedByMod[i];
        if (group.length < 2) {
            continue;
        }

        for (let j = 1; j < group.length; j += 1) {
            const diff = frequencies[group[j]] - frequencies[group[j - 1]];
            if (diff <= best) {
                if (diff < best) {
                    best = diff;
                    bestIndex = Number.POSITIVE_INFINITY;
                }
                if (group[j - 1] < bestIndex) {
                    bestIndex = group[j - 1];
                    bestValue = frequencies[group[j]];
                }
            }
        }
    }

    return bestValue;
};
