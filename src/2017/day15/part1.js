const iterations = 40000000;

module.exports = (input) => {
    let [a, b] = input.split(/\n/g).map(value => value.replace(/\D/g, '')).map(Number);

    let count = 0;

    for (let i = 0; i < iterations; i += 1) {
        a = (a * 16807) % 2147483647;
        b = (b * 48271) % 2147483647;

        if ((a & 65535) === (b & 65535)) {
            count += 1;
        }
    }

    return count;
};
