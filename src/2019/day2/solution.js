const noun = 12;
const verb = 2;
const targetValue = 19690720;

module.exports = (input) => {
    const mem1 = input.split(/,/g).map(Number);
    const mem2 = mem1.slice();

    mem1[1] = noun;
    mem1[2] = verb;
    for (let i = 0; mem1[i] !== 99; i += 4) {
        const opcode = mem1[i];
        if (opcode === 1) {
            mem1[mem1[i + 3]] = mem1[mem1[i + 1]] + mem1[mem1[i + 2]];
            mem2[mem2[i + 3]] = mem2[mem2[i + 1]] + mem2[mem2[i + 2]];
        } else if (opcode === 2) {
            mem1[mem1[i + 3]] = mem1[mem1[i + 1]] * mem1[mem1[i + 2]];
            mem2[mem2[i + 3]] = mem2[mem2[i + 1]] * mem2[mem2[i + 2]];
        }
    }

    const part1 = mem1[0];
    const nullValue = mem2[0];
    const nounValue = (part1 - nullValue - verb) / 12;
    const targetNoun = Math.floor((targetValue - nullValue) / nounValue);
    const targetVerb = targetValue - targetNoun * nounValue - nullValue;
    const part2 = 100 * targetNoun + targetVerb;
    return [part1, part2];
};
