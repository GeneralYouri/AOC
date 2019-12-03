// module.exports = (input) => {
//     const [a, b] = input.split(/\n/g).map(value => value.replace(/\D/g, '')).map(Number);
//
//     let [a1, a2, a3] = [0, a >> 3, a & 0x7]; // 15, 13, 3 bits
//     let [b1, b2, b3] = [0, b >> 3, b & 0x7]; // 15, 13, 3 bits
//
//     let count = 0;
//     for (let i = 0; i < 5000000; i += 1) {
//         do {
//             a1 *= 16807;
//             a2 *= 16807;
//             a3 *= 16807;
//
//             a3 += a1 >> 15;
//             a1 &= 0x7fff;
//
//             a2 += a3 >> 3;
//             a3 &= 0x7;
//             a1 += a2 >> 13;
//             a2 &= 0x1fff;
//             a3 += a1 >> 15;
//             a1 &= 0x7fff;
//
//             a2 += a3 >> 3;
//             a3 &= 0x7;
//             // a1 += a2 >> 13;
//             // a2 &= 0x1fff;
//         } while (a3 & 0x3);
//
//         do {
//             b1 *= 48271;
//             b2 *= 48271;
//             b3 *= 48271;
//
//             b3 += b1 >> 15;
//             b1 &= 0x7fff;
//
//             b2 += b3 >> 3;
//             b3 &= 0x7;
//             b1 += b2 >> 13;
//             b2 &= 0x1fff;
//             b3 += b1 >> 15;
//             b1 &= 0x7fff;
//
//             b2 += b3 >> 3;
//             b3 &= 0x7;
//             // b1 += b2 >> 13;
//             // b2 &= 0x1fff;
//         } while (b3);
//
//         if (a2 === b2 && a3 === b3) {
//             count += 1;
//         }
//     }
//     return count;
// };

// module.exports = (input) => {
//     const [a, b] = input.split(/\n/g).map(value => value.replace(/\D/g, '')).map(Number);
//
//     let [a1, a2, a3] = [0, a >> 1, a & 0x1]; // 15, 15, 1 bits
//     let [b1, b2, b3] = [0, b >> 1, b & 0x1]; // 15, 15, 1 bits
//
//     let count = 0;
//     for (let i = 0; i < 5000000; i += 1) {
//         do {
//             a1 *= 16807;
//             a2 = a2 * 16807 + a3 * 8403;
//
//             a1 += a2 >> 15;
//             a2 &= 0x7fff;
//             a3 += a1 >> 15;
//             a1 &= 0x7fff;
//
//             a2 += a3 >> 1;
//             a3 &= 0x1;
//             a1 += a2 >> 15;
//             a2 &= 0x7fff;
//             a3 += a1 >> 15;
//             a1 &= 0x7fff;
//         } while ((a2 + a3) & 0x3);
//
//         do {
//             b1 *= 48271;
//             b2 = b2 * 48271 + b3 * 24135;
//
//             b1 += b2 >> 15;
//             b2 &= 0x7fff;
//             b3 += b1 >> 15;
//             b1 &= 0x7fff;
//
//             b2 += b3 >> 1;
//             b3 &= 0x1;
//             b1 += b2 >> 15;
//             b2 &= 0x7fff;
//             b3 += b1 >> 15;
//             b1 &= 0x7fff;
//             b2 += b3 >> 1;
//             b3 &= 0x1;
//         } while ((b2 + b3) & 0x7);
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

    for (let i = 0; i < 5000000; i += 1) {
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
