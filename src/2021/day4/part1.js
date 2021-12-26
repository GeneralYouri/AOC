require('../library.js');

// Assume Bingo boards are of size 5x5

// Boards can Bingo through a single complete row or column
const winMasks = [
    0b1111100000000000000000000, 0b0000011111000000000000000, 0b0000000000111110000000000, 0b0000000000000001111100000, 0b0000000000000000000011111,
    0b1000010000100001000010000, 0b0100001000010000100001000, 0b0010000100001000010000100, 0b0001000010000100001000010, 0b0000100001000010000100001,
];

const hasWon = mark => winMasks.some(mask => (mark & mask) === mask);

const unmarkedSum = (board, marks) => board.filter((n, i) => !(1 << i & marks)).sum();

module.exports = (input) => {
    const [inputNumbers, ...inputBoards] = input.groups();
    const numbers = inputNumbers.words(',').map(Number);
    const boards = inputBoards.map(board => board.trim().words(/\s+/).map(Number));
    const marks = boards.map(() => 0);

    for (const n of numbers) {
        for (let i = 0; i < boards.length; i += 1) {
            const board = boards[i];
            const mark = board.indexOf(n);
            if (mark !== -1) {
                marks[i] |= 1 << mark;
                if (hasWon(marks[i])) {
                    return unmarkedSum(board, marks[i]) * n;
                }
            }
        }
    }
    return undefined;
};
