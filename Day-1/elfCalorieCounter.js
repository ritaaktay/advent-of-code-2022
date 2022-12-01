const { readFileSync } = require("fs");

class ElfCalorieCounter {
  constructor(path) {
    this.input = readFileSync(path).toString().split("\n");
    this.elves = [];
    this.splitElves();
  }

  splitElves = () => {
    let elf = [];
    this.input.forEach((i) => {
      if (i != "") {
        elf.push(parseInt(i));
      } else {
        this.elves.push(elf);
        elf = [];
      }
    });
  };

  getElfWithMostCalories = () => {
    const elfTotals = this.elves.map((elf) => {
      return elf.reduce((a, b) => a + b, 0);
    });
    return elfTotals.reduce((a, b) => (a > b ? a : b));
  };
}

module.exports = ElfCalorieCounter;
