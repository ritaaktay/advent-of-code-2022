const { readFileSync } = require("fs");

class ElfCalorieCounter {
  constructor(path) {
    this.path = path;
    this.elves = this.makeElves();
  }

  makeElves = () => {
    const input = readFileSync(this.path).toString().split("\n");
    let elf = [];
    let elves = [];
    input.forEach((i) => {
      if (i != "") {
        elf.push(parseInt(i));
      } else {
        elves.push(elf);
        elf = [];
      }
    });
    return elves;
  };

  getElfWithMostCalories = () => {
    const elfTotals = this.getElfTotals(this.elves);
    return elfTotals.reduce((a, b) => (a > b ? a : b));
  };

  getTopThreeElvesWithMostCalories = () => {
    const elfTotals = this.getElfTotals(this.elves);
    return elfTotals
      .sort()
      .slice(0, 3)
      .reduce((a, b) => a + b, 0);
  };

  getElfTotals = (elves) => {
    return elves.map((elf) => {
      return elf.reduce((a, b) => a + b, 0);
    });
  };
}

module.exports = ElfCalorieCounter;
