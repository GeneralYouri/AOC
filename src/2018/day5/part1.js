module.exports = (polymer) => {
    let lastLength = polymer.length;

    while (true) {
        for (let i = 0; i < polymer.length - 1; i += 1) {
            if (Math.abs(polymer.charCodeAt(i) - polymer.charCodeAt(i + 1)) === 32) {
                polymer = polymer.substring(0, i) + polymer.substring(i + 2);
            }
        }

        if (polymer.length === lastLength) {
            return polymer.length;
        }
        lastLength = polymer.length;
    }
};
