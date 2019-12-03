// (n * m) % 2147483647
// @see https://github.com/Voltara/advent2017-fast/blob/master/src/day15.c
// return = (n * m) % 2147483647
// const word3Mod = (n, m) => {
//     let a = (n >> 16) * m; // 15 + 16 bits
//     let b = ((n >> 8) & 0xff) * m; // 8 + 16 bits
//     let c = (n & 0xff) * m; // 8 + 16 bits
//
//     b += c >> 8;
//     c &= 0xff;
//     a += b >> 8;
//     b &= 0xff;
//     c += a >> 15;
//     a &= 0x7fff;
//
//     b += c >> 8;
//     c &= 0xff;
//     a += b >> 8;
//     b &= 0xff;
//     c += a >> 15;
//     a &= 0x7fff;
//
//     return (a << 16) + (b << 8) + c;
// };

// module.exports = (input) => {
//     const [a, b] = input.split(/\n/g).map(value => value.replace(/\D/g, '')).map(Number);
//
//     let [a1, a2, a3] = [0, a >> 1, a & 0x1]; // 15, 15, 1 bits
//     let [b1, b2, b3] = [b >> 16, (b >> 1) & 0x7fff, b & 0x1]; // 15, 15, 1 bits
//
//     let count = 0;
//     for (let i = 0; i < 40000000; i += 1) {
//         a1 *= 16807; // 31 bits, 1581695857, 1581695857
//         a2 = a2 * 16807 + a3 * 8403; // 31 bits, 1581719992, 1581719992
//
//         a1 += a2 >> 15; // 31 bits, 1581744127, 1581744127
//         a2 &= 0x7fff; // 15 bits, 32767, 8632
//         a3 += a1 >> 15; // 16 bits, 48271, 48271
//         a1 &= 0x7fff; // 15 bits, 32767, 32767
//
//         a2 += a3 >> 1; // 16 bits, 56902, 32767
//         a3 &= 0x1; // 1 bit, 1, 1
//         a1 += a2 >> 15; // 32768, 32767
//         a2 &= 0x7fff; // 15 bits, 32767, 32767
//         a3 += a1 >> 15; // 16 bits, 48271, 48271
//         a1 &= 0x7fff; // 15 bits, 32767, 32767
//
//         b1 *= 48271;
//         b2 = b2 * 48271 + b3 * 24135;
//
//         b1 += b2 >> 15;
//         b2 &= 0x7fff;
//         b3 += b1 >> 15;
//         b1 &= 0x7fff;
//
//         b2 += b3 >> 1;
//         b3 &= 0x1;
//         b1 += b2 >> 15;
//         b2 &= 0x7fff;
//         b3 += b1 >> 15;
//         b1 &= 0x7fff;
//
//         if (a2 === b2 && a3 === b3) {
//             count += 1;
//         }
//     }
//     return count;
// };

module.exports = (input) => {
    let [a, b] = input.split(/\n/g).map(value => value.replace(/\D/g, '')).map(Number);

    let count = 0;

    for (let i = 0; i < 40000000; i += 1) {
        a = (a * 16807) % 2147483647;
        b = (b * 48271) % 2147483647;

        if ((a & 65535) === (b & 65535)) {
            count += 1;
        }
    }

    return count;
};
