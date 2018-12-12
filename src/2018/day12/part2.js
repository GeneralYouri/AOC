const printState = (state) => {
    return Object.values(state).reduce((acc, isPotted) => acc + (isPotted ? '#' : '.'), '');
};

module.exports = (input) => {
    const [initialLine, , ...ruleLines] = input.split(/\n/g);
    const initialState = initialLine.substr(15).split('').reduce((acc, char, index) => {
        acc[index] = char === '#';
        return acc;
    }, {});

    const rules = Array.from(new Array(32));
    ruleLines.forEach((line) => {
        const [fromStr, toChar] = line.split(' => ');
        const from = fromStr.split('').reduce((acc, char, index) => {
            acc += (char === '#') ? 2 ** (4 - index) : 0;
            return acc;
        }, 0);
        const to = toChar === '#';
        rules[from] = to;
    });

    let state = initialState;
    let stateValue = Object.entries(state).reduce((sum, [index, isPotted]) => sum + (isPotted ? +index : 0), 0);
    let valueDiff = 0;
    let leftIndex = -2;
    let rightIndex = initialLine.length - 15 + 1;

    for (let g = 0; true; g += 1) {
        const newState = {};
        let value = state[leftIndex + 2] ? 1 : 0;

        for (let index = leftIndex; index <= rightIndex; index += 1) {
            newState[index] = rules[value];

            if (state[index - 2]) {
                value -= 16;
            }
            value *= 2;
            value += (state[+index + 3]) ? 1 : 0;
        }

        leftIndex += 2;
        rightIndex -= 2;
        for (const [index, isPotted] of Object.entries(newState)) {
            if (isPotted && index < leftIndex) {
                leftIndex = +index;
            }
            if (isPotted && index > rightIndex) {
                rightIndex = +index;
            }
        }
        leftIndex -= 2;
        rightIndex += 2;

        const newStateValue = Object.entries(newState).reduce((sum, [index, isPotted]) => sum + (isPotted ? +index : 0), 0);
        const newValueDiff = newStateValue - stateValue;
        if (valueDiff === newValueDiff) {
            return stateValue + (50000000000 - g) * valueDiff;
        }
        state = newState;
        stateValue = newStateValue;
        valueDiff = newValueDiff;
    }
};
