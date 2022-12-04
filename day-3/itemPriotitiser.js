const { readFileSync } = require("fs");

class ItemPrioritiser {
  constructor(path) {
    this.path = path;
    this.rucksacks = this.getRucksacks();
    this.priorityHash = {};
    this.getPriorityHash();
  }

  getPriorityHash() {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 1; i <= 52; i++) {
      this.priorityHash[alphabet[i - 1]] = i;
    }
    console.log(this.priorityHash);
  }

  getRucksacks() {
    return readFileSync(path).toString().split("/n");
  }

  getTotalPriorities() {}

  getPriorities() {}

  getRepeatingItem() {}
}

module.exports = ItemPrioritiser;
