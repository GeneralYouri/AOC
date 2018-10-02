module.exports = (input) => {
    const map = input.split(/\n/g).map(line => line.split(''));

    let answer = '';
    let pos = [map[0].indexOf('|'), 0];
    let dp = [0, 1];

    /* eslint-disable no-constant-condition */
    while (true) {
        const char = map[pos[1]][pos[0]];

        if (char === '+') {
            if (dp[0] === 0 && map[pos[1]][pos[0] - 1] !== ' ') {
                dp = [-1, 0];
            } else if (dp[0] === 0 && map[pos[1]][pos[0] + 1] !== ' ') {
                dp = [1, 0];
            } else if (dp[1] === 0 && map[pos[1] - 1][pos[0]] !== ' ') {
                dp = [0, -1];
            } else if (dp[1] === 0 && map[pos[1] + 1][pos[0]] !== ' ') {
                dp = [0, 1];
            } else {
                throw new Error('WTF BOOM');
            }
        } else if (char === ' ') {
            return answer;
        } else if (char !== '|' && char !== '-') {
            answer += char;
        }

        pos = [pos[0] + dp[0], pos[1] + dp[1]];
    }
};
