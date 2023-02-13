const { readFileSync } = require("fs");

class SignalReader {
  constructor(path, y) {
    this.path = path;
    this.y = y;
    [this.row, this.scanners] = this.parse();
  }

  calculate() {
    let scanned = [];
    this.scanners.forEach((s) => (scanned = this.getScan(s, scanned)));
    return scanned.filter((s) => {
      return !this.row.some(
        (x) => (x[0] == s && x[1] == this.y) || (x[2] == s && x[3] == this.y)
      );
    }).length;
  }

  getScan(s, scanned = []) {
    console.log({ s });
    const range = s[4];
    console.log({ range });
    const distance = Math.abs(this.y - s[1]);
    console.log({ distance });
    const amount = range * 2 + 1 - distance * 2;
    console.log({ amount });
    const start = s[0] - range + distance;
    console.log({ start });
    if (amount > 0) {
      for (let i = start; i < start + amount; i++) {
        // console.log(i);
        if (!scanned.includes(i)) scanned.push(i);
      }
    }
    return scanned;
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
    const max = Math.max(...coordinates.map((c) => c[4]));
    const scanners = coordinates.filter(
      (c) => c[1] <= this.y + max && c[1] >= this.y - max
    );
    const row = coordinates.filter((c) => c[1] == this.y || c[3] == this.y);
    return [row, scanners];
  }
}

module.exports = SignalReader;
