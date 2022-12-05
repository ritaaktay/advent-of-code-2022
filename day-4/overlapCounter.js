const { readFileSync } = require("fs");

class OverlapCounter {
  constructor(path) {
    this.path = path;
    this.pairs = this.getPairs();
  }

  getPairs() {
    const pairs = readFileSync(this.path).toString().split("\n");
    return pairs.slice(0, pairs.length - 1);
  }

  entireOverlap(pair) {
    pair = pair.split(",").map((p) => p.split("-").map((num) => parseInt(num)));
    return (
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1])
    );
  }

  overlap(pair) {
    pair = pair.split(",").map((p) => p.split("-").map((num) => parseInt(num)));
    return (
      (pair[0][0] <= pair[1][1] && pair[0][0] >= pair[1][0]) ||
      (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1])
    );
  }

  getAllEntireOverlaps() {
    let counter = 0;
    this.pairs.forEach((pair) => {
      if (this.entireOverlap(pair)) counter++;
    });
    return counter;
  }

  getAllOverlaps() {
    let counter = 0;
    this.pairs.forEach((pair) => {
      if (this.overlap(pair)) counter++;
    });
    return counter;
  }
}

const counter = new OverlapCounter("./day-4/input.txt");
console.log(counter.getAllEntireOverlaps());

module.exports = OverlapCounter;
