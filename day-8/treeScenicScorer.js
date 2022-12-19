const { readFileSync } = require("fs");

class TreeScenicScorer {
  constructor(path) {
    this.matrix = this.#parseMatrix(path);
  }

  getTreeWithHighestScenicScore() {
    const scores = [];
    for (let r = 0; r < this.matrix.length; r++) {
      for (let i = 0; i < this.matrix.length; i++) {
        scores.push(this.getScenicScore(r, i));
      }
    }
    return Math.max(...scores);
  }

  getScenicScore(indexOfRow, indexOfTree) {
    return (
      this.getScoreLeft(indexOfRow, indexOfTree) *
      this.getScoreRight(indexOfRow, indexOfTree) *
      this.getScoreTop(indexOfRow, indexOfTree) *
      this.getScoreBottom(indexOfRow, indexOfTree)
    );
  }

  getScoreLeft(indexOfRow, indexOfTree) {
    const row = this.matrix[indexOfRow];
    const left = row.slice(0, indexOfTree).reverse();
    for (let i = 0; i < left.length; i++) {
      if (left[i] >= row[indexOfTree]) return i + 1;
    }
    return left.length;
  }

  getScoreRight(indexOfRow, indexOfTree) {
    const row = this.matrix[indexOfRow];
    const right = row.slice(indexOfTree + 1);
    for (let i = 0; i < right.length; i++) {
      if (right[i] >= row[indexOfTree]) return i + 1;
    }
    return right.length;
  }

  getScoreTop(indexOfRow, indexOfTree) {
    const tree = this.matrix[indexOfRow][indexOfTree];
    let counter = 0;
    for (let i = indexOfRow - 1; i >= 0; i--) {
      counter++;
      if (this.matrix[i][indexOfTree] >= tree) break;
    }
    return counter;
  }

  getScoreBottom(indexOfRow, indexOfTree) {
    const tree = this.matrix[indexOfRow][indexOfTree];
    let counter = 0;
    for (let i = indexOfRow + 1; i < this.matrix.length; i++) {
      counter++;
      if (this.matrix[i][indexOfTree] >= tree) break;
    }
    return counter;
  }

  #parseMatrix(path) {
    const rows = readFileSync(path).toString().split("\n");
    rows.pop();
    return rows.map((row) => row.split(""));
  }
}

module.exports = TreeScenicScorer;
