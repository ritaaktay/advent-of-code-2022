const { readFileSync } = require("fs");

class ItemPrioritiser {
  constructor(path) {
    this.path = path;
    this.rucksacks = this.getRucksacks();
    this.priorityHash = this.getPriorityHash();
  }

  getRucksacks() {
    const rucksacks = readFileSync(path).toString().split("\n");
    return rucksacks.slice(0, rucksacks.length - 1);
  }

  getTotalPriorities() {
    const priorities = this.getPriorities();
    return priorities.reduce((a, b) => a + b);
  }

  getPriorityHash() {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const hash = {};
    for (let i = 1; i <= 52; i++) {
      hash[alphabet[i - 1]] = i;
    }
    return hash;
  }

  getPriorities() {
    return this.rucksacks.map((rs) => {
      const item = this.getRepeatingItem(rs);
      console.log(this.priorityHash[item]);
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
