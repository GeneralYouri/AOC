module.exports = (polymer) => {
    const reacted = polymer.split('');
    let lastJump = -1;
    for (let i = 0, j = 1; j < polymer.length; i += 1, j += 1) {
        if (!reacted[i]) {
            lastJump = i;
            i = j - 1;
        }
        if ((polymer.charCodeAt(i) ^ polymer.charCodeAt(j)) === 32) {
            reacted[i] = '';
            reacted[j] = '';

            if (lastJump > -1 && !reacted[i - 1]) {
                i = lastJump;
                lastJump = -1;
            }
            do {
                i -= 1;
            } while (!reacted[i] && i > 0);
            i -= 1;
        }
    }
    return reacted.join('');
};

module.exports = (polymer, exclude) => {
    const stack = [];
    for (let i = 0; i < polymer.length; i += 1) {
        if (!exclude || (polymer.charCodeAt(i) & 31) !== exclude) {
            if (stack.length > 0 && (polymer.charCodeAt(i) ^ stack[stack.length - 1].charCodeAt(0)) === 32) {
                stack.pop();
            } else {
                stack.push(polymer[i]);
            }
        }
    }
    return stack;
};
