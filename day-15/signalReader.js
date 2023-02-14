const { readFileSync } = require("fs");

class SignalReader {
  constructor(path, y) {
    this.path = path;
    this.y = y;
    this.data = this.parse();
    // [this.row, this.scanners] = this.parse();
  }

  calculate() {
    const scanned = this.getScannersInMaxRange()
      .map((s) => this.getScanRange(s))
      .filter((r) => r != 0);
    const joined = this.joinRanges(scanned);
    const beacons = this.getBeaconCount(joined);
    const lengths = joined.map((range) => range[1] - range[0]);
    return lengths.reduce((a, b) => a + b, 0) + 1 - beacons;
  }

  getScannersInMaxRange() {
    const max = Math.max(...this.data.map((c) => c[4]));
    return this.data.filter(
      (c) => c[1] <= this.y + max && c[1] >= this.y - max
    );
  }

  getScanRange(s) {
    const range = s[4];
    const distance = Math.abs(this.y - s[1]);
    const amount = range * 2 + 1 - distance * 2;
    const start = s[0] - range + distance;
    if (amount <= 0) return 0;
    return [start, start + amount - 1];
  }

  joinRanges(ranges) {
    const concatenated = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
      concatenated.forEach((c, x) => {
        const overlap = this.overlap(ranges[i], c);
        if (overlap) concatenated[x] = overlap;
        else concatenated.push(ranges[i]);
      });
    }
    if (this.noOverlaps(concatenated)) return concatenated;
    return this.joinRanges(concatenated);
  }

  noOverlaps(ranges) {
    if (ranges.length == 1) return true;
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

  getBeaconCount(ranges) {
    const beacons = [];
    this.getRow().forEach((x) => {
      for (let i = 0; i < ranges.length; i++) {
        if (ranges[i][0] < x[2] && ranges[i][1] > x[2] && x[3] == this.y) {
          beacons.push(x[2]);
          return;
        }
      }
    });
    return [...new Set(beacons)].length;
  }

  getRow() {
    return this.data.filter((c) => c[1] == this.y || c[3] == this.y);
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
    return coordinates;

    // const max = Math.max(...coordinates.map((c) => c[4]));
    // const scanners = coordinates.filter(
    //   (c) => c[1] <= this.y + max && c[1] >= this.y - max
    // );
    // const row = coordinates.filter((c) => c[1] == this.y || c[3] == this.y);
    // return [row, scanners];
  }
}

module.exports = SignalReader;
