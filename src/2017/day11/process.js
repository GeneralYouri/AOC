const directions = {
    n: { x: 0, y: 1, z: -1 },
    ne: { x: 1, y: 0, z: -1 },
    se: { x: 1, y: -1, z: 0 },
    s: { x: 0, y: -1, z: 1 },
    sw: { x: -1, y: 0, z: 1 },
    nw: { x: -1, y: 1, z: 0 },
};

module.exports = (steps, onAfterStep = () => {}) => {
    let x = 0;
    let y = 0;
    let z = 0;

    return steps.reduce((_, step) => {
        const dir = directions[step];
        x += dir.x;
        y += dir.y;
        z += dir.z;

        const stepCount = Math.max(0, x) + Math.max(0, y) + Math.max(0, z);
        onAfterStep(stepCount);
        return stepCount;
    }, 0);
};
