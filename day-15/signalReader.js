const { readFileSync } = require("fs");

class SignalReader {
  constructor(path, y) {
    this.path = path;
    this.y = y;
    [this.row, this.scanners] = this.parse();
  }

  calculate() {
    const scanned = this.scanners
      .map((s) => this.getScan(s))
      .filter((r) => r != 0);
    const joined = this.concat(scanned);
    const occupied = this.getOccupied(joined);
    const amounts = joined.map((range) => range[1] - range[0]);
    return amounts.reduce((a, b) => a + b, 0) + 1 - occupied;
    // the plus one is for having the start & end indices inclusive
  }

  getScan(s) {
    const range = s[4];
    const distance = Math.abs(this.y - s[1]);
    const amount = range * 2 + 1 - distance * 2;
    const start = s[0] - range + distance;
    if (amount <= 0) return 0;
    return [start, start + amount - 1];
  }

  concat(ranges) {
    const concatenated = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
      concatenated.forEach((c, x) => {
        const overlap = this.overlap(ranges[i], c);
        if (overlap) concatenated[x] = overlap;
        else concatenated.push(ranges[i]);
      });
    }
    if (this.allAreSeparate(concatenated)) return concatenated;
    return this.concat(concatenated);
  }

  allAreSeparate(ranges) {
    // returns false if it finds overlap there is overlap
    // returns true if there is no overlap between any of the ranges
    if (ranges.length == 1) return true;
    for (let i = 0; i < ranges.length; i++) {
      for (let x = 0; x < ranges.length; x++) {
        // DO NOT COMPARE SAME INDICES
        if (i == x) continue;
        if (this.overlap(ranges[i], ranges[x])) return false;
      }
    }
    return true;
  }

  overlap(a, b) {
    // where a and b are arrays with [start,end]
    // returns false is no overlap
    // returns joined indices [start, end] if overlap
    const [firstStart, firstEnd] = a[0] > b[0] ? b : a;
    const [secondStart, secondEnd] = a[0] <= b[0] ? b : a;
    if (firstEnd <= secondEnd && firstEnd >= secondStart) {
      return [firstStart, secondEnd];
    }
    if (firstEnd >= secondEnd) return [firstStart, firstEnd];
    return false;
  }

  getOccupied(ranges) {
    const blocked = this.row.map((x) => {
      for (let i = 0; i < ranges.length; i++) {
        const start = ranges[i][0];
        const end = ranges[i][1];
        if (start < x[0] && end > x[0] && x[1] == this.y) return x[0];
        if (start < x[2] && end > x[2] && x[3] == this.y) return x[2];
      }
    });
    return [...new Set(blocked)].length;
  }

  parse(y) {
    const data = readFileSync(this.path).toString().trim().split("\n");
    const coordinates = data.map((line) => {
      return line
        .match(
          /Sensor at x=(-*\d+), y=(-*\d+): closest beacon is at x=(-*\d+), y=(-*\d+)/
        )
        .slice(1, 5)
        .map((int) => parseInt(int));
    });
    coordinates.forEach((c) => {
      c.push(Math.abs(c[2] - c[0]) + Math.abs(c[3] - c[1]));
    });
    const max = Math.max(...coordinates.map((c) => c[4]));
    const scanners = coordinates.filter(
      (c) => c[1] <= this.y + max && c[1] >= this.y - max
    );
    const row = coordinates.filter((c) => c[1] == this.y || c[3] == this.y);
    return [row, scanners];
  }
}

module.exports = SignalReader;
