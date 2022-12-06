const { readFileSync } = require("fs");

class CrateMover {
  constructor(path) {
    this.path = path;
    this.crates = this.getCrates();
    this.instructions = this.getInstructions();
  }

  getCrates() {
    const lines = readFileSync(this.path).toString().split("\n");
    lines.pop();
    const divider = lines.indexOf("");
    // return lines.slice(0, divider);
  }

  getInstructions() {
    const lines = readFileSync(this.path).toString().split("\n");
    return lines.filter((line) => line.includes("move"));
  }
}

module.exports = CrateMover;
