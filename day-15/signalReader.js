const { readFileSync } = require("fs");

class SignalReader {
  constructor(path) {
    this.path = path;
    this.data = this.parse();
    this.max = Math.max(...this.data.map((d) => d[4]));
  }

  calculate(y) {
    const scannersInMax = this.data.filter(
      (d) => d[1] <= y + this.max && d[1] >= y - this.max
    );
    const scanZones = scannersInMax.map((s) => this.getScanZone(s)).flat();
    const zoneRow = scanZones.filter((p) => p[1] == y);
    const originalRow = this.data.filter((d) => d[1] == y || d[3] == y);
    const noOverlap = zoneRow.filter((pos) => {
      return !originalRow.some(
        (d) =>
          (d[0] == pos[0] && d[1] == pos[1]) ||
          (d[2] == pos[0] && d[3] == pos[1])
      );
    });
    return [...new Set(noOverlap.map((x) => JSON.stringify(x)))].length;
  }

  getScanZone(scanner) {
    const coordinates = [];
    let left = scanner[0];
    let amount = 1;
    for (let y = scanner[1] - scanner[4]; y <= scanner[1]; y++) {
      for (let x = left; x < left + amount; x++) {
        coordinates.push([x, y]);
      }
      left -= 1;
      amount += 2;
    }
    left = scanner[0];
    amount = 1;
    for (let y = scanner[1] + scanner[4]; y > scanner[1]; y--) {
      for (let x = left; x < left + amount; x++) {
        coordinates.push([x, y]);
      }
      left -= 1;
      amount += 2;
    }
    return coordinates;
  }

  draw(coordinates) {
    coordinates = coordinates.map((c) => [c[0] + 10, c[1] + 10]);
    const width = Math.max(...coordinates.map((c) => c[0]));
    const height = Math.max(...coordinates.map((c) => c[1]));
    const matrix = new Array(height + 1).fill().map((row) => {
      return new Array(width + 1).fill(".");
    });
    coordinates.forEach((c) => (matrix[c[1]][c[0]] = "#"));
    console.log(matrix.map((row) => row.join("")).join("\n"));
  }

  parse() {
    const data = readFileSync(this.path).toString().trim().split("\n");
    const coordiantes = data.map((line) => {
      return line
        .match(
          /Sensor at x=(-*\d+), y=(-*\d+): closest beacon is at x=(-*\d+), y=(-*\d+)/
        )
        .slice(1, 5)
        .map((int) => parseInt(int));
    });
    coordiantes.forEach((c) => {
      c.push(Math.abs(c[2] - c[0]) + Math.abs(c[3] - c[1]));
    });
    return coordiantes;
  }
}

module.exports = SignalReader;
