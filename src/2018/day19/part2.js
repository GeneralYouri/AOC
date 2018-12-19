module.exports = () => {
    const n = 10551275;
    const sqrt = Math.floor(Math.sqrt(n));
    let result = 0;
    for (let a = 1; a <= sqrt; a += 1) {
        const b = Math.trunc(n / a);
        if (a * b === n) {
            result += a + b;
        }
    }
    return result;
};
