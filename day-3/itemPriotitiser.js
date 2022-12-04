const { readFileSync } = require("fs");

class ItemPrioritiser {
  constructor(path) {
    this.path = path;
    this.rucksacks = this.getRucksacks();
    this.priorityHash = {};
  }

  getRucksacks() {
    const rucksacks = readFileSync(path).toString().split("\n");
    return rucksacks.slice(0, rucksacks.length - 1);
  }

  getTotalPriorities() {
    this.getPriorityHash();
    const priorities = this.getPriorities();
    return priorities.reduce((a, b) => a + b);
  }

  getPriorityHash() {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 1; i <= 52; i++) {
      this.priorityHash[alphabet[i - 1]] = i;
    }
  }

  getPriorities() {
    this.rucksacks.forEach((rs) => {
      this.getRepeatingItem(rs);
    });
  }

  getRepeatingItem() {
    return;
  }
}

module.exports = ItemPrioritiser;
