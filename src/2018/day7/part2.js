module.exports = (input, stepCount = 26, workerCount = 5, flatDelayPerStep = 60) => {
    const rules = input.split(/\n/g).map(line => [line[5], line[36]]);

    const stepNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, stepCount);
    const allowed = new Set();
    const required = stepNames.map((name) => {
        const list = rules.reduce((acc, [from, to]) => {
            if (to === name) {
                acc.add(from);
            }
            return acc;
        }, new Set());
        if (list.size === 0) {
            allowed.add(name);
        }
        return list;
    });
    const workers = Array.from(new Array(workerCount)).fill(0);
    const workingOn = Array.from(new Array(workerCount)).fill('');

    let order = '';
    let time = 0;
    while (order.length < stepCount) {
        for (let w = 0; w < workerCount; w += 1) {
            if (workers[w] === 1) {
                const toAdd = workingOn[w];
                order += toAdd;
                workingOn[w] = '';

                required.forEach((list, index) => {
                    list.delete(toAdd);
                    const name = String.fromCharCode(index + 65);
                    if (!order.includes(name) && list.size === 0 && !allowed.has(name) && !workingOn.includes(name)) {
                        allowed.add(name);
                    }
                });
            }
        }
        for (let w = 0; w < workerCount; w += 1) {
            if (workers[w] > 0) {
                workers[w] -= 1;
            }
            if (workers[w] === 0) {
                const toAdd = stepNames.find(name => allowed.has(name));
                if (toAdd) {
                    allowed.delete(toAdd);
                    workers[w] = toAdd.charCodeAt(0) - 64 + flatDelayPerStep;
                    workingOn[w] = toAdd;
                }
            }
        }

        time += 1;
    }

    return time - 1;
};
