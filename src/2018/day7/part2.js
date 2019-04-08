module.exports = (input, stepCount = 26, workerCount = 5, flatDelayPerStep = 60) => {
    const rules = input.split(/\n/g).map(line => [5, 36].map(index => line.charCodeAt(index) - 65));

    const stepNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, stepCount);
    const required = stepNames.map(() => 0);
    rules.forEach(([fromIndex, toIndex]) => {
        required[toIndex] |= 1 << fromIndex;
    });
    const workers = Array.from(new Array(workerCount)).fill(0);
    const workingOn = Array.from(new Array(workerCount)).fill(-1);

    let time = 0;
    let order = '';
    let used = 0;
    while (order.length < stepCount) {
        for (let w = 0; w < workerCount; w += 1) {
            workers[w] -= 1;
            if (workers[w] === 0) {
                const nextIndex = workingOn[w];
                order += stepNames[nextIndex];
                workingOn[w] = -1;

                required.forEach((mask, index) => {
                    required[index] &= ~(1 << nextIndex);
                });
            }
        }
        for (let w = 0; w < workerCount; w += 1) {
            if (workers[w] <= 0) {
                const nextIndex = stepNames.findIndex((name, index) => (used & (1 << index)) === 0 && required[index] === 0);
                if (nextIndex !== -1) {
                    workers[w] = nextIndex + flatDelayPerStep + 1;
                    workingOn[w] = nextIndex;
                    used |= 1 << nextIndex;
                }
            }
        }
        time += 1;
    }
    return time - 1;
};
