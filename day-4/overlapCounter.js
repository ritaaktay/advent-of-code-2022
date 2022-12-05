const { readFileSync } = require("fs");

class OverlapCounter {
  constructor(path) {
    this.path = path;
    this.pairs = this.getPairs();
  }

  getPairs() {
    const pairs = readFileSync(this.path).toString().split("\n");
    console.log(pairs);
    return pairs.slice(0, pairs.length - 1);
  }

  getTotalOverlaps() {}
}

// const counter = new OverlapCounter("./day-4/input.txt");
// console.log(counter.getTotalOverlaps());

module.exports = OverlapCounter;
