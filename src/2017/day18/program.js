class Program {
    constructor(id) {
        this.id = id;

        this.registers = [...Array(26)].reduce((acc, value, index) => {
            acc[String.fromCharCode(index + 97)] = 0;
            return acc;
        }, {});
        this.registers.p = this.id;
        this.currentInstruction = 0;

        this.queue = [];
        this.lastValue = null;
        this.sentValues = 0;
    }

    enqueue(value) {
        this.queue.push(value);
    }

    parseValue(value) {
        return (typeof value === 'string') ? this.registers[value] : value;
    }

    step(type, X, Y) {
        this.currentInstruction += 1;

        switch (type) {
            case 'snd': {
                this.lastValue = this.parseValue(X);
                this.sentValues += 1;
                return this.lastValue;
            }
            case 'set': {
                this.registers[X] = this.parseValue(Y);
                break;
            }
            case 'add': {
                this.registers[X] += this.parseValue(Y);
                break;
            }
            case 'mul': {
                this.registers[X] *= this.parseValue(Y);
                break;
            }
            case 'mod': {
                this.registers[X] %= this.parseValue(Y);
                break;
            }
            case 'rcv': {
                if (this.queue.length === 0) {
                    this.currentInstruction -= 1;
                    return null;
                }
                this.registers[X] = this.queue.shift();
                break;
            }
            case 'jgz': {
                if (this.parseValue(X) > 0) {
                    this.currentInstruction += this.parseValue(Y) - 1;
                }
                break;
            }
            default: {
                break;
            }
        }
        return undefined;
    }
}

module.exports = Program;
