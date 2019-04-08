module.exports = (input, stepCount = 26) => {
    const rules = input.split(/\n/g).map(line => [5, 36].map(index => line.charCodeAt(index) - 65));

    const stepNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, stepCount);
    const required = stepNames.map(() => 0);
    rules.forEach(([fromIndex, toIndex]) => {
        required[toIndex] |= 1 << fromIndex;
    });

    let order = '';
    let used = 0;
    while (order.length < stepCount) {
        const nextIndex = stepNames.findIndex((name, index) => (used & (1 << index)) === 0 && required[index] === 0);
        order += stepNames[nextIndex];
        used |= 1 << nextIndex;

        required.forEach((mask, index) => {
            required[index] &= ~(1 << nextIndex);
        });
    }
    return order;
};
