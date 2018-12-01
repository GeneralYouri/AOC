module.exports = (input) => {
    return input.split(/\n/g).reduce((acc, change) => acc + Number(change), 0);
};
