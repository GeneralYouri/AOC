module.exports = (input, stepCount = 26) => {
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

    let order = '';
    while (order.length < stepCount) {
        const toAdd = stepNames.find(name => allowed.has(name));
        order += toAdd;
        allowed.delete(toAdd);

        required.forEach((list, index) => {
            list.delete(toAdd);
            const name = String.fromCharCode(index + 65);
            if (!order.includes(name) && list.size === 0) {
                allowed.add(name);
            }
        });
    }

    return order;
};
