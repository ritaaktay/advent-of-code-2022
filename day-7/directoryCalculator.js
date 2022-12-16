const { readFileSync } = require("fs");

class DirectoryCalculator {
  pickSmallestAbove(root, total, needed) {
    const limit = this.calculateSpaceToFreeUp(root, total, needed);
    const above = [];
    this.#checkTotalAbove(root, above, limit);
    return Math.min(...above);
  }

  calculateSpaceToFreeUp(root, total, needed) {
    const unused = total - root.size();
    return needed - unused;
  }

  #checkTotalAbove(dir, above, limit) {
    if (dir.size() >= limit) above.push(dir.size());
    dir.children.forEach((child) => this.#checkTotalAbove(child, above, limit));
  }

  calculateTotalBelow(root, limit) {
    const below = [];
    this.#checkTotalBelow(root, below, limit);
    return below.reduce((a, b) => a + b);
  }

  #checkTotalBelow(dir, below, limit) {
    if (dir.size() <= limit) below.push(dir.size());
    dir.children.forEach((child) => this.#checkTotalBelow(child, below, limit));
  }
}

module.exports = DirectoryCalculator;
