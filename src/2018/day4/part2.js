module.exports = (input) => {
    const guardLines = input.split(/\n/g).sort();
    const guards = {};

    let currentId;
    let startMinute;
    let endMinute;

    let xMinute = -1;
    let xMinutes = -1;
    let xId = -1;

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

                if (guards[currentId][minute] > xMinutes) {
                    xMinutes = guards[currentId][minute];
                    xMinute = minute;
                    xId = currentId;
                }
            }
        }
    }

    return xId * xMinute;
};
