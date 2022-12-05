const { readFileSync } = require("fs");

class ItemPrioritiser {
  constructor(path) {
    this.path = path;
    this.rucksacks = this.getRucksacks();
    this.priorityHash = this.getPriorityHash();
  }

  getRucksacks() {
    const rucksacks = readFileSync(this.path).toString().split("\n");
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

  getTotalPrioritiesForBadges() {
    const priorities = this.getPrioritiesForBadges();
    return priorities.reduce((a, b) => a + b);
  }

  getPrioritiesForBadges() {
    const priorities = [];
    for (let i = 0; i < this.rucksacks.length; i += 3) {
      const badge = this.getBadge([
        this.rucksacks[i],
        this.rucksacks[i + 1],
        this.rucksacks[i + 2],
      ]);
      priorities.push(this.priorityHash[badge]);
    }
    return priorities;
  }

  getBadge(rs) {
    for (let item of rs[0]) {
      if (rs[1].includes(item) && rs[2].includes(item)) return item;
    }
  }
}

const prioritiser = new ItemPrioritiser("./day-3/input.txt");
console.log(prioritiser.getTotalPrioritiesForBadges());

module.exports = ItemPrioritiser;
