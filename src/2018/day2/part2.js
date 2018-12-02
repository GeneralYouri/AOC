module.exports = (input) => {
    const boxes = input.split(/\n/g);

    for (let a = 0; a < boxes.length; a += 1) {
        const boxA = boxes[a];
        for (let b = a + 1; b < boxes.length; b += 1) {
            const boxB = boxes[b];
            let diff = 0;
            for (let i = 0; i < boxA.length; i += 1) {
                if (boxA[i] !== boxB[i]) {
                    diff += 1;
                }
            }
            if (diff === 1) {
                return boxA.split('').filter((letterA, indexA) => letterA === boxB[indexA]).join('');
            }
        }
    }

    return undefined;
};
