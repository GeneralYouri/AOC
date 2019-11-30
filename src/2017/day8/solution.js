const parseLine = /^(\w+) (inc|dec) (-?\d+) if (\w+) ([=!<>]+) (-?\d+)$/;

module.exports = (input) => {
    const commands = input.split(/\n/g);
    const registers = {};
    let part2 = 0;

    commands.forEach((commandString) => {
        const [, register, operation, amount, cndRegister, cndOperation, cndCompare] = parseLine.exec(commandString);

        const cndValue = (registers[cndRegister] === undefined) ? 0 : registers[cndRegister];

        let cndResult;
        if (cndOperation === '==') {
            cndResult = cndValue === Number(cndCompare);
        } else if (cndOperation === '!=') {
            cndResult = cndValue !== Number(cndCompare);
        } else if (cndOperation === '<=') {
            cndResult = cndValue <= Number(cndCompare);
        } else if (cndOperation === '>=') {
            cndResult = cndValue >= Number(cndCompare);
        } else if (cndOperation === '<') {
            cndResult = cndValue < Number(cndCompare);
        } else if (cndOperation === '>') {
            cndResult = cndValue > Number(cndCompare);
        }

        if (cndResult) {
            if (operation === 'inc') {
                registers[register] = (registers[register] || 0) + Number(amount);
                if (registers[register] > part2) {
                    part2 = registers[register];
                }
            } else { // dec
                registers[register] = (registers[register] || 0) - Number(amount);
            }
        }
    });

    const part1 = Math.max(...Object.values(registers));
    return [part1, part2];
};
