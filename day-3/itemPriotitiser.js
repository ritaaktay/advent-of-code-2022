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
    this.rucksacks.map((rs) => {
      const item = this.getRepeatingItem(rs);
      return this.priorityHash[item];
    });
  }

  getRepeatingItem(rs) {
    const firstComp = rs.slice(0, rs.length / 2);
    const secondComp = rs.slice(rs.length / 2, rs.length);
    for (let item of rs) {
      if (secondComp.includes(item)) return item;
    }
  }
}

module.exports = ItemPrioritiser;
