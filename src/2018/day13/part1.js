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
    const carts = [];

    for (let y = 0; y < map.length; y += 1) {
        const row = map[y];
        for (let x = 0; x < row.length; x += 1) {
            const char = row[x];
            if (cartTypes.includes(char)) {
                carts.push([x, y, 0, (char === '<' || char === '>') ? '-' : '|']);
            }
        }
    }

    while (true) {
        for (const cart of carts) {
            const [x, y, turnState, oldChar] = cart;
            const char = map[y][x];
            const [dx, dy] = deltas[char];
            const nextX = x + dx;
            const nextY = y + dy;
            const nextChar = map[nextY][nextX];

            if (cartTypes.includes(nextChar)) {
                return nextX + ',' + nextY;
            } else if (nextChar === '|' || nextChar === '-') {
                map[nextY][nextX] = char;
            } else if (nextChar === '/' || nextChar === '\\') {
                map[nextY][nextX] = turns[nextChar][char];
            } else if (nextChar === '+') {
                map[nextY][nextX] = turns[nextChar][char][turnState];
                cart[2] = (turnState + 1) % 3;
            }

            cart[0] = nextX;
            cart[1] = nextY;
            map[y][x] = oldChar;
            cart[3] = nextChar;
        }
    }
};
