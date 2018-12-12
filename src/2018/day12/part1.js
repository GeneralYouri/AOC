module.exports = (input) => {
    const [initialLine, , ...ruleLines] = input.split(/\n/g);
    const initialState = '.'.repeat(20) + initialLine.substr(15) + '.'.repeat(20);

    const rules = ruleLines.reduce((acc, line) => {
        const [fromStr, toChar] = line.split(' => ');
        acc[fromStr] = toChar;
        return acc;
    }, {});

    let state = initialState;
    const leftIndex = -20;

    for (let g = 0; g < 20; g += 1) {
        let newState = '';
        state.split('').forEach((char, index) => {
            const i = index;
            let neighbours = '';
            neighbours += state[i - 2] || '.';
            neighbours += state[i - 1] || '.';
            neighbours += state[i] || '.';
            neighbours += state[i + 1] || '.';
            neighbours += state[i + 2] || '.';
            const newChar = rules[neighbours] || '.';
            newState += newChar;
        });
        state = newState;
    }

    return state.split('').reduce((sum, char, index) => sum + (char === '#' ? (index + leftIndex) : 0), 0);
};
