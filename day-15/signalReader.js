const { readFileSync } = require("fs");

class SignalReader {
  constructor(path) {
    this.path = path;
    this.data = this.parse();
  }

  findBeacon(x) {
    for (let i = 0; i <= x; i++) {
      const ranges = this.getRangesForRow(i);
      if (ranges.length == 2) {
        const [first, second] =
          ranges[0][0] > ranges[1][0]
            ? [ranges[1], ranges[0]]
            : [ranges[0], ranges[1]];
        if (second[0] - first[1] > 1) {
          return (first[1] + 1) * 4000000 + i;
        }
      }
    }
  }

  calculate(y) {
    const ranges = this.getRangesForRow(y);
    const lengths = ranges.map((range) => range[1] - range[0] + 1);
    const beacons = this.getBeaconCount(ranges, y);
    return lengths.reduce((a, b) => a + b, 0) - beacons;
  }

  getRangesForRow(y) {
    const scanned = this.getScannersInMaxRange(y)
      .map((s) => this.getScanRange(s, y))
      .filter((r) => r != 0);
    return this.joinRanges(scanned);
  }

  getScanRange(s, y) {
    const range = s[4];
    const distance = Math.abs(y - s[1]);
    const amount = range * 2 + 1 - distance * 2;
    const start = s[0] - range + distance;
    if (amount <= 0) return 0;
    return [start, start + amount - 1];
  }

  joinRanges(ranges) {
    const unique = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
      let added = false;
      for (let x = 0; x < unique.length; x++) {
        const overlap = this.overlap(ranges[i], unique[x]);
        if (overlap) {
          unique[x] = overlap;
          added = true;
        }
      }
      if (!added) unique.push(ranges[i]);
    }
    if (this.noneOverlap(unique)) return unique;
    return this.joinRanges(unique);
  }

  noneOverlap(ranges) {
    for (let i = 0; i < ranges.length; i++) {
      for (let x = 0; x < ranges.length; x++) {
        if (i == x) continue;
        if (this.overlap(ranges[i], ranges[x])) return false;
      }
    }
    return true;
  }

  overlap(a, b) {
    const [firstStart, firstEnd] = a[0] > b[0] ? b : a;
    const [secondStart, secondEnd] = a[0] <= b[0] ? b : a;
    if (firstEnd <= secondEnd && firstEnd >= secondStart) {
      return [firstStart, secondEnd];
    }
    if (firstEnd >= secondEnd) return [firstStart, firstEnd];
    return false;
  }

  getBeaconCount(ranges, y) {
    const beacons = [];
    this.getRow(y).forEach((x) => {
      for (let i = 0; i < ranges.length; i++) {
        if (ranges[i][0] < x[2] && ranges[i][1] > x[2] && x[3] == y) {
          beacons.push(x[2]);
          return;
        }
      }
    });
    return [...new Set(beacons)].length;
  }

  getScannersInMaxRange(y) {
    const max = Math.max(...this.data.map((c) => c[4]));
    return this.data.filter((c) => c[1] <= y + max && c[1] >= y - max);
  }

  getRow(y) {
    return this.data.filter((c) => c[1] == y || c[3] == y);
  }

  parse() {
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
    return coordinates;
  }
}

module.exports = SignalReader;
