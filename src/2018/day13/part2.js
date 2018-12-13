module.exports = (input) => {
    const map = input.split(/\n/g).map(line => line.split(''));
    const cartTypes = ['^', '>', 'v', '<'];
    const deltas = {
        '^': [0, -1],
        '>': [1, 0],
        'v': [0, 1],
        '<': [-1, 0],
    };
    const turns = {
        '+': {
            '^': ['<', '^', '>'],
            '>': ['^', '>', 'v'],
            'v': ['>', 'v', '<'],
            '<': ['v', '<', '^'],
        },
        '/': {
            '^': '>',
            '>': '^',
            'v': '<',
            '<': 'v',
        },
        '\\': {
            '^': '<',
            '>': 'v',
            'v': '>',
            '<': '^',
        },
    };

    let carts = [];
    for (let y = 0; y < map.length; y += 1) {
        const row = map[y];
        for (let x = 0; x < row.length; x += 1) {
            const char = row[x];
            if (cartTypes.includes(char)) {
                carts.push([char, x, y, ...deltas[char], 0, true]); // type, x, y, dx, dy, turnState
                map[y][x] = (char === '<' || char === '>') ? '-' : '|';
            }
        }
    }
    let cartCount = carts.length;

    for (let i = 0; true; i += 1) {
        for (const cart of carts) {
            const [type, x, y, dx, dy, turnState, isAlive] = cart;
            if (!isAlive) {
                continue;
            }

            const nextX = x + dx;
            const nextY = y + dy;
            const nextChar = map[nextY][nextX];

            const otherCart = carts.find(([, otherX, otherY, , , , otherIsAlive]) => otherIsAlive && otherX === nextX && otherY === nextY);
            if (otherCart) {
                cart[6] = false;
                otherCart[6] = false;
                cartCount -= 2;
            }

            cart[1] = nextX;
            cart[2] = nextY;
            if (nextChar === '/' || nextChar === '\\') {
                cart[0] = turns[nextChar][type];
                [cart[3], cart[4]] = deltas[cart[0]];
            } else if (nextChar === '+') {
                cart[0] = turns[nextChar][type][turnState];
                [cart[3], cart[4]] = deltas[cart[0]];
                cart[5] = (turnState + 1) % 3;
            }
        }

        carts = carts.sort((a, b) => (a[2] - b[2]) || (a[1] - b[1]));
        if (cartCount === 1) {
            const liveCart = carts.find(([, liveX, liveY, , , , liveIsAlive]) => liveIsAlive);
            return liveCart[1] + ',' + liveCart[2];
        }
    }
};
