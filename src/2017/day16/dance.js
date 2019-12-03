class Dance {
    constructor(programCount, danceMoves) {
        this.programCount = programCount;
        this.danceMoves = danceMoves;

        this.startIndex = 0;
        this.dancers = Array.from(Array(programCount)).map((_, index) => String.fromCharCode(index + 97));
    }

    rotateIndex(index) {
        return (Number(index) + this.startIndex + this.programCount) % this.programCount;
    }

    s(count) {
        this.startIndex = this.rotateIndex(-count);
    }

    x(i1, i2) {
        const index1 = this.rotateIndex(Number(i1));
        const index2 = this.rotateIndex(Number(i2));
        const name1 = this.dancers[index1];
        const name2 = this.dancers[index2];
        this.swap(index1, index2, name1, name2);
    }

    p(name1, name2) {
        const index1 = this.dancers.indexOf(name1);
        const index2 = this.dancers.indexOf(name2);
        this.swap(index1, index2, name1, name2);
    }

    swap(index1, index2, name1, name2) {
        this.dancers[index1] = name2;
        this.dancers[index2] = name1;
    }

    perform() {
        for (let i = 0; i < this.danceMoves.length; i += 1) {
            const [operation, args] = this.danceMoves[i];
            this[operation](...args);
        }

        return this.dancers.slice(this.startIndex).join('') + this.dancers.slice(0, this.startIndex).join('');
    }
}

module.exports = Dance;
