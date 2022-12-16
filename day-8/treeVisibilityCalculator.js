const { readFileSync } = require("fs");

class DirectoryCreator {
  constructor(path) {
    this.matrix = this.#parseMatrix(path);
  }

  #parseMatrix(path) {
    const rows = readFileSync(path).toString().split("\n");
    rows.pop();
    return rows.map((row) => row.split(""));
  }
}

module.exports = DirectoryCreator;
