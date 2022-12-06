const { readFileSync } = require("fs");

class CrateMover {
  constructor(path) {
    this.path = path;
    this.stacks = this.getStacks();
    this.instructions = this.getInstructions();
  }

  getStacks() {
    const lines = readFileSync(this.path).toString().split("\n");
    lines.pop();
    const divider = lines.indexOf("");
    const crateData = lines.slice(0, divider - 1);
    return this.makeStacks(crateData);
  }

  makeStacks(crateData) {
    const stackAmount = (crateData[0].length + 1) / 4;
    let stacks = {};
    for (let i = 1; i <= stackAmount; i++) {
      stacks[i] = [];
    }
    crateData.forEach((row) => {
      let counter = 1;
      for (let i = 1; i < row.length; i += 4) {
        if (row[i] != " ") {
          stacks[counter].push(row[i]);
        }
        counter++;
        if (counter > stackAmount) counter = 0;
      }
    });
    return stacks;
  }

  getInstructions() {
    const lines = readFileSync(this.path).toString().split("\n");
    return lines.filter((line) => line.includes("move"));
  }
}

module.exports = CrateMover;
