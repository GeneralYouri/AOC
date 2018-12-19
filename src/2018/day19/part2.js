module.exports = (input) => {
    const lines = input.split(/\n/g);
    const p = Number(lines[22].split(' ')[2]);
    const q = Number(lines[24].split(' ')[2]);
    const n1 = 22 * p + q + 836;
    const n2 = Math.trunc(Number.MAX_SAFE_INTEGER / 2); // n1 + 10550400;

    const sqrt = Math.floor(Math.sqrt(n2));
    let result = 0;
    for (let a = 1; a <= sqrt; a += 1) {
        const b = Math.trunc(n2 / a);
        if (a * b === n2) {
            result += a + b;
        }
    }
    if (sqrt ** 2 === n2) {
        result += sqrt;
    }
    return result;
};
