const { readFileSync } = require("fs");

class SignalReader {
  constructor(path) {
    this.path = path;
    this.sensorsAndBeacons = this.parse();
  }

  findBeaconAtRow(x) {
    for (let i = 0; i <= x; i++) {
      const ranges = this.getScanRangesForRow(i);
      if (ranges.length == 2) {
        const [first, second] = ranges.sort((a, b) => a[0] - b[0]);
        if (second[0] - first[1] > 1) {
          return (first[1] + 1) * 4000000 + i;
        }
      }
    }
  }

  noBeaconSpotsInRow(y) {
    const scannerRanges = this.getScanRangesForRow(y);
    const scanLengths = scannerRanges.map((range) => range[1] - range[0] + 1);
    const beaconsAtRow = this.getBeaconCountAtRow(scannerRanges, y);
    const total = scanLengths.reduce((a, b) => a + b, 0);
    return total - beaconsAtRow;
  }

  getScanRangesForRow(y) {
    const scanned = this.getScannersInMaxRange(y)
      .map((s) => this.getScannerRange(s, y))
      .filter((r) => r != 0);
    return this.joinRanges(scanned);
  }

  getScannerRange(s, y) {
    const scanRange = s[4];
    const distanceFromRow = Math.abs(y - s[1]);
    const scanLength = scanRange * 2 + 1 - distanceFromRow * 2;
    const startIndex = s[0] - scanRange + distanceFromRow;
    if (scanLength <= 0) return 0;
    return [startIndex, startIndex + scanLength - 1];
  }

  joinRanges(ranges) {
    const uniqueRanges = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
      let added = false;
      for (let x = 0; x < uniqueRanges.length; x++) {
        const jointRange = this.getJointRange(ranges[i], uniqueRanges[x]);
        if (jointRange) {
          uniqueRanges[x] = jointRange;
          added = true;
        }
      }
      if (!added) uniqueRanges.push(ranges[i]);
    }
    if (this.noOverlaps(uniqueRanges)) return uniqueRanges;
    return this.joinRanges(uniqueRanges);
  }

  noOverlaps(ranges) {
    for (let i = 0; i < ranges.length; i++) {
      for (let x = 0; x < ranges.length; x++) {
        if (i == x) continue;
        if (this.getJointRange(ranges[i], ranges[x])) return false;
      }
    }
    return true;
  }

  getJointRange(a, b) {
    const [firstStart, firstEnd] = a[0] > b[0] ? b : a;
    const [secondStart, secondEnd] = a[0] <= b[0] ? b : a;
    if (firstEnd <= secondEnd && firstEnd >= secondStart) {
      return [firstStart, secondEnd];
    }
    if (firstEnd >= secondEnd) return [firstStart, firstEnd];
    return false;
  }

  getBeaconCountAtRow(ranges, y) {
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
    const maxRange = Math.max(...this.sensorsAndBeacons.map((c) => c[4]));
    return this.sensorsAndBeacons.filter(
      (c) => c[1] <= y + maxRange && c[1] >= y - maxRange
    );
  }

  getRow(y) {
    return this.sensorsAndBeacons.filter((c) => c[1] == y || c[3] == y);
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
