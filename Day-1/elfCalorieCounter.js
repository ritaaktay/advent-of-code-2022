const { readFileSync } = require("fs");

class ElfCalorieCounter {
  getElfWithMostCalories = (path) => {
    const input = readFileSync(path).toString().split("\n");
    let all = [];
    let elf = [];
    input.forEach((i) => {
      if (i != "") {
        elf.push(i);
      } else {
        const total = elf
          .map((cal) => parseInt(cal))
          .reduce((a, b) => a + b, 0);
        all.push(total);
        elf = [];
      }
    });
    return all.reduce((a, b) => (a > b ? a : b));
  };
}

module.exports = ElfCalorieCounter;
