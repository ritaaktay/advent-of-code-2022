const { readFileSync } = require("fs");

class DirectoryCalculator {
  calculate(root) {
    const below = [];
    this.#checkSizes(root, below);
    return below.reduce((a, b) => a + b);
  }

  #checkSizes(dir, below) {
    if (dir.size() <= 100000) below.push(dir.size());
    dir.children.forEach((child) => this.#checkSizes(child, below));
  }
}

module.exports = DirectoryCalculator;
