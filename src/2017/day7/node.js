module.exports = class Node {
    constructor(name, weight, children) {
        this.name = name;
        this.weight = weight;
        this.children = children;
    }
};
