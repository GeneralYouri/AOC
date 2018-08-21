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
