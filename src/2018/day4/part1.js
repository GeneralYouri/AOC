module.exports = (input) => {
    const guardLines = input.split(/\n/g).sort();
    const guards = {};
    const minutesAsleep = {};

    let currentId;
    let startMinute;
    let endMinute;

    let mostAsleepMinutes = -1;
    let mostAsleepId = -1;

    for (const line of guardLines) {
        if (line.includes('begins shift')) {
            currentId = Number(line.split(' ')[3].slice(1));
            if (!guards[currentId]) {
                guards[currentId] = [];
            }
        } else if (line.includes('falls asleep')) {
            startMinute = Number(line.split(':')[1].slice(0, 2));
        } else if (line.includes('wakes up')) {
            endMinute = Number(line.split(':')[1].slice(0, 2));
            for (let minute = startMinute; minute < endMinute; minute += 1) {
                guards[currentId][minute] = (guards[currentId][minute] || 0) + 1;
            }

            minutesAsleep[currentId] = (minutesAsleep[currentId] || 0) + endMinute - startMinute;
            if (minutesAsleep[currentId] > mostAsleepMinutes) {
                mostAsleepMinutes = minutesAsleep[currentId];
                mostAsleepId = currentId;
            }
        }
    }

    let mostAsleepMinute = -1;
    guards[mostAsleepId].reduce((acc, count, minute) => {
        if (count > acc) {
            mostAsleepMinute = minute;
            return count;
        }
        return acc;
    }, 0);

    return mostAsleepId * mostAsleepMinute;
};
