// @see https://github.com/GeneralYouri/AOC-Toolkit/blob/master/src/primes.js#L1
// A low-level primality test by trial division; iterating all possible divisors, filtered using wheel-30 factorization
const isPrimeWheel30 = (n) => {
    if (n % 3 === 0 || n % 5 === 0) {
        return false;
    }

    const sqrt = Math.trunc(Math.sqrt(n));

    for (let divisor = 7; divisor <= sqrt; divisor += 30) {
        if (
            n % divisor === 0 ||
            n % (divisor + 4) === 0 ||
            n % (divisor + 6) === 0 ||
            n % (divisor + 10) === 0 ||
            n % (divisor + 12) === 0 ||
            n % (divisor + 16) === 0 ||
            n % (divisor + 22) === 0 ||
            n % (divisor + 24) === 0
        ) {
            return false;
        }
    }

    return true;
};

// A rare case where we needed to program for just our input, and no other, as such this will not work for other inputs
// The input (a list of assembly-like instructions) is converted into a functionally equivalent, but faster (lower time complexity), JS function
// The code is supposed to count how many numbers within the given interval are composite (not prime).
module.exports = (input) => {
    // These values are unique to my input
    const lower = 108400;
    const upper = 125400;
    const delta = 17;
    // delta is assumed to divide both lower and upper

    // Skip all even numbers as they're guaranteed not prime
    let h = (upper - lower) / delta / 2 + 1;
    for (let b = lower + delta; b <= upper; b += 2 * delta) {
        if (!isPrimeWheel30(b)) {
            h += 1;
        }
    }
    return h;
};
