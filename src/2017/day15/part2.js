const iterations = 5000000;

module.exports = (input) => {
    let [a, b] = input.split(/\n/g).map(value => value.replace(/\D/g, '')).map(Number);

    let count = 0;

    for (let i = 0; i < iterations; i += 1) {
        do {
            a = (a * 16807) % 2147483647;
        } while ((a & 3) !== 0);

        do {
            b = (b * 48271) % 2147483647;
        } while ((b & 7) !== 0);

        if ((a & 65535) === (b & 65535)) {
            count += 1;
        }
    }

    return count;
};
