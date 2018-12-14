const addAfter = (value, marble) => {
    const toAdd = {
        value,
        prev: marble,
        next: marble.next,
    };
    marble.next.prev = toAdd;
    marble.next = toAdd;
    return toAdd;
};

module.exports = (input) => {
    const [playerCount, marbleCount] = input.match(/\d+/g).map(Number);

    const scores = {};
    for (let i = 1; i <= playerCount; i += 1) {
        scores[i] = 0;
    }
    let player = 1;

    let marble = {
        value: 0,
    };
    marble.next = marble;
    marble.prev = marble;

    for (let m = 1; m <= marbleCount * 100; m += 1) {
        if (m % 23 === 0) {
            scores[player] += m;
            marble = marble.prev.prev.prev.prev.prev.prev;
            scores[player] += marble.prev.value;
            marble.prev.prev.next = marble;
            marble.prev = marble.prev.prev;
        } else {
            marble = addAfter(m, marble.next);
        }

        if (player >= playerCount) {
            player -= playerCount;
        }
        player += 1;
    }

    return Math.max(...Object.values(scores));
};
