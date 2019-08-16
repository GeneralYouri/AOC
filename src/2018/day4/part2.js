module.exports = (input) => {
    const guardLines = input.split(/\n/g).sort();
    const guardsById = {};

    let currentId;
    let startMinute;
    let endMinute;

    for (const line of guardLines) {
        if (line.endsWith('begins shift')) {
            currentId = Number(line.match(/#(\d+)/)[1]);
            if (!guardsById[currentId]) {
                guardsById[currentId] = Array(60).fill(0);
            }
        } else if (line.endsWith('falls asleep')) {
            startMinute = Number(line.match(/:(\d+)/)[1]);
        } else if (line.endsWith('wakes up')) {
            endMinute = Number(line.match(/:(\d+)/)[1]);
            for (let minute = startMinute; minute < endMinute; minute += 1) {
                guardsById[currentId][minute] += 1;
            }
        }
    }

    let best = -1;
    let bestMinute = -1;
    let bestId = -1;
    for (const id of Object.keys(guardsById)) {
        const mostAsleepMinute = Math.max(...guardsById[id]);
        if (mostAsleepMinute > best) {
            best = mostAsleepMinute;
            bestMinute = guardsById[id].findIndex(timesAsleep => timesAsleep === mostAsleepMinute);
            bestId = id;
        }
    }

    return bestId * bestMinute;
};
