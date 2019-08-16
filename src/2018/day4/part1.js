module.exports = (input) => {
    const guardLines = input.split(/\n/g).sort();
    const guardsById = {};
    const minutesAsleepById = {};

    let currentId;
    let startMinute;
    let endMinute;

    let mostAsleepId = -1;
    let mostAsleepMinutes = -1;

    for (const line of guardLines) {
        if (line.endsWith('begins shift')) {
            currentId = Number(line.match(/#(\d+)/)[1]);
            if (!guardsById[currentId]) {
                guardsById[currentId] = Array(60).fill(0);
                minutesAsleepById[currentId] = 0;
            }
        } else if (line.endsWith('falls asleep')) {
            startMinute = Number(line.match(/:(\d+)/)[1]);
        } else {
            endMinute = Number(line.match(/:(\d+)/)[1]);
            for (let minute = startMinute; minute < endMinute; minute += 1) {
                guardsById[currentId][minute] += 1;
            }

            minutesAsleepById[currentId] += endMinute - startMinute;
            if (minutesAsleepById[currentId] > mostAsleepMinutes) {
                mostAsleepMinutes = minutesAsleepById[currentId];
                mostAsleepId = currentId;
            }
        }
    }

    const mostAsleepMinute = Math.max(...guardsById[mostAsleepId]);
    const mostAsleepMinuteId = guardsById[mostAsleepId].findIndex(timesAsleep => timesAsleep === mostAsleepMinute);
    return mostAsleepId * mostAsleepMinuteId;
};
