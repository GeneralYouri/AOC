module.exports = class KnotHash {
    constructor(startList, startPosition, startSkipSize, lengths) {
        this.list = startList;
        this.position = startPosition;
        this.skipSize = startSkipSize;
        this.lengths = lengths;
    }

    // Reverse a given portion of the list
    reverse(length) {
        // Shifting the list first ensures no issues for start+length values that would exceed the list length
        const listLength = this.list.length;
        const shifted = [...this.list.splice(this.position), ...this.list];
        const reversed = [...shifted.splice(0, length).reverse(), ...shifted];
        this.list = [...reversed.splice(listLength - this.position), ...reversed];
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
