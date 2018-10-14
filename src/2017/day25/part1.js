const parseBeginState = str => /Begin in state (\w)\./.exec(str)[1].charCodeAt(0) - 65;
const parseChecksumSteps = str => Number(/Perform a diagnostic checksum after (\d+) steps\./.exec(str)[1]);
const parseStateChangeWrite = str => Number(/Write the value (\d)\./.exec(str)[1]);
const parseStateChangeMove = str => ((/Move one slot to the (\w+)\./.exec(str)[1] === 'right') ? 1 : -1);
const parseStateChangeNext = str => /Continue with state (\w)\./.exec(str)[1].charCodeAt(0) - 65;

module.exports = (input) => {
    const [headerString, ...stateBlockStrings] = input.split(/\n\n/g);
    const [beginStateString, checksumStepsString] = headerString.split(/\n/);

    const beginState = parseBeginState(beginStateString);
    const checksumSteps = parseChecksumSteps(checksumStepsString);
    const states = stateBlockStrings.map((stateBlockString) => {
        const stateChangeStrings = stateBlockString.split(/\n/g);
        return [
            {
                write: parseStateChangeWrite(stateChangeStrings[2]),
                move: parseStateChangeMove(stateChangeStrings[3]),
                next: parseStateChangeNext(stateChangeStrings[4]),
            }, {
                write: parseStateChangeWrite(stateChangeStrings[6]),
                move: parseStateChangeMove(stateChangeStrings[7]),
                next: parseStateChangeNext(stateChangeStrings[8]),
            },
        ];
    });

    const tape = { 0: 0 };
    let cursor = 0;
    let state = beginState;

    for (let step = 0; step < checksumSteps; step += 1) {
        const stateChange = states[state];
        const { write, move, next } = stateChange[tape[cursor] || 0];
        tape[cursor] = write;
        cursor += move;
        state = next;
    }

    return Object.values(tape).reduce((checksum, value) => checksum + value);
};
