// TODO: This alternative approach
module.exports = (input) => {
    const jump = Number(input);

    // First we find on what index 2017 ends up at, while ignoring the actual values
    let pos = 0;
    for (let i = 1; i <= 2017; i += 1) {
        pos = (pos + jump) % i + 1;
    }
    let want = pos + 1;

    // Then we walk back through the algorithm until the last time we inserted at the index that eventually comes after 2017
    let result;
    for (result = 2017; pos !== want; result -= 1) {
        if (pos < want) {
            want -= 1;
        }
        pos -= jump + 1;
        if (pos < 0) {
            pos += result;
        }
    }
    return result;
};


function Node(value) {
    this.value = value;
    this.next = this;
}

module.exports = (input) => {
    const jump = Number(input);

    let current = new Node(0);

    for (let i = 1; i <= 2017; i += 1) {
        for (let j = 0; j < jump % i; j += 1) {
            current = current.next;
        }

        const insert = new Node(i);
        insert.next = current.next;
        current.next = insert;
        current = insert;
    }
    return current.next.value;
};
