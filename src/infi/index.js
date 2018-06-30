const { defInput } = require('./input.js');

const parseRobot = /(\[.+?])+?/g;
const parseMove = /(\(.+?\))+?/g;

function addPositions([x1, y1], [x2, y2]) {
    return [x1 + x2, y1 + y2];
}

function doRound(robots, moves) {
    return robots.map((robot, i) => addPositions(robot, moves[i]));
}

function findCollision(robots) {
    const hashTable = {};

    for (let robot of robots) {
        const index = robot.toString();
        if (!hashTable[index]) {
            hashTable[index] = true;
        } else {
            return robot;
        }
    }

    return null;
}

function parts(input) {
    const robots = input.match(parseRobot).map(str => str.substring(1, str.length - 1).split(',').map(Number));
    const moves = input.match(parseMove).map(str => str.substring(1, str.length - 1).split(',').map(Number));

    const collisions = [];
    let roundRobots = robots;
    for (let moveStart = 0; moveStart < moves.length; moveStart += robots.length) {
        const roundMoves = moves.slice(moveStart, moveStart + robots.length);
        roundRobots = doRound(roundRobots, roundMoves);
        const collision = findCollision(roundRobots);
        if (collision !== null) {
            collisions.push(collision);
        }
    }

    const maxX = Math.max(...collisions.map(c => c[0]));
    const maxY = Math.max(...collisions.map(c => c[1]));

    const secret = Array.from(Array(maxY + 1)).map(() => Array(maxX + 1).fill(' '));
    collisions.forEach(([x, y]) => {
        secret[y][x] = '#';
    });

    return { part1: collisions.length, part2: secret.map(row => row.join('')).join('\n') };
}

function test(input = defInput) {
    const answer = parts(input);
    console.log('Part 1 answer', answer.part1);
    console.log('Part 2 answer\n', answer.part2);
}

exports.parts = parts;
exports.test = test;

if (module === require.main) {
    exports.test(...process.argv.slice(2));
}
