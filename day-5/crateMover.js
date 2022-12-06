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

  getInstruction() {
    const lines = readFileSync(this.path).toString().split("\n");
    return lines.filter((line) => line.contains("move"));
  }
}

const counter = new OverlapCounter("./day-4/input.txt");
console.log(counter.getAllOverlaps());

module.exports = OverlapCounter;
