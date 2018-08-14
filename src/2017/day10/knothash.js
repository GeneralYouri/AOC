module.exports = class KnotHash {
    constructor(startList, startPosition, startSkipSize, lengths) {
        this.list = startList;
        this.position = startPosition;
        this.skipSize = startSkipSize;
        this.lengths = lengths;
    }

    // Reverse a given portion of the list
    reverse(length) {
        for (let i = 0; i < length / 2; i += 1) {
            const p1 = (this.position + i) % this.list.length;
            const p2 = (this.position - i + length - 1) % this.list.length;
            [this.list[p1], this.list[p2]] = [this.list[p2], this.list[p1]];
        }
    }

    knot() {
        this.lengths.forEach((length) => {
            this.reverse(length);
            this.position = (this.position + length + this.skipSize) % this.list.length;
            this.skipSize += 1;
        });
    }

    hash(blockLength = 16) {
        const blockCount = this.list.length / blockLength;
        if (Math.ceil(blockCount) !== blockCount) {
            throw new Error('List length MUST be evenly divisible by block length');
        }

        const list = this.list.slice();
        return Array.from(Array(blockCount)).map(() => {
            const block = list.splice(0, blockLength).reduce((acc, val) => acc ^ val, 0);
            return block.toString(blockLength).padStart(2, '0');
        }).join('');
    }
};
