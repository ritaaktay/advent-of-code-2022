const { readFileSync } = require("fs");

class TreeVisibilityCalculator {
  constructor(path) {
    this.matrix = this.#parseMatrix(path);
    this.visible = this.matrix.length * 4 - 4;
  }

  countVisibleTrees() {
    for (let r = 1; r < this.matrix.length - 1; r++) {
      for (let i = 1; i < this.matrix.length - 1; i++) {
        if (this.isVisible(r, i)) this.visible++;
      }
    }
    return this.visible;
  }

  isVisible(indexOfRow, indexOfTree) {
    if (this.checkVisibleLeft(indexOfRow, indexOfTree)) return true;
    if (this.checkVisibleRight(indexOfRow, indexOfTree)) return true;
    if (this.checkVisibleTop(indexOfRow, indexOfTree)) return true;
    if (this.checkVisibleBottom(indexOfRow, indexOfTree)) return true;
    return false;
  }

  checkVisibleLeft(indexOfRow, indexOfTree) {
    const row = this.matrix[indexOfRow];
    const left = row.slice(0, indexOfTree);
    if (Math.max(...left) < row[indexOfTree]) return true;
    return false;
  }

  checkVisibleRight(indexOfRow, indexOfTree) {
    const row = this.matrix[indexOfRow];
    const right = row.slice(indexOfTree + 1);
    if (Math.max(...right) < row[indexOfTree]) return true;
    return false;
  }

  checkVisibleTop(indexOfRow, indexOfTree) {
    const tree = this.matrix[indexOfRow][indexOfTree];
    const top = [];
    for (let i = 0; i < indexOfRow; i++) {
      top.push(this.matrix[i][indexOfTree]);
    }
    if (Math.max(...top) < tree) return true;
    return false;
  }

  checkVisibleBottom(indexOfRow, indexOfTree) {
    const tree = this.matrix[indexOfRow][indexOfTree];
    const bottom = [];
    for (let i = indexOfRow + 1; i < this.matrix.length; i++) {
      bottom.push(this.matrix[i][indexOfTree]);
    }
    if (Math.max(...bottom) < tree) return true;
    else return false;
  }

  #parseMatrix(path) {
    const rows = readFileSync(path).toString().split("\n");
    rows.pop();
    return rows.map((row) => row.split(""));
  }
}

module.exports = TreeVisibilityCalculator;
