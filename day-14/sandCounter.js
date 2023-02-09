const { readFileSync } = require("fs");
const { cursorTo } = require("readline");

class SandCounter {
  constructor(path) {
    this.path = path;
    this.matrix = this.parse();
    this.sand = 0;
  }

  count() {
    let curr = [0, 500];
    while (this.getAvailableMove(curr)) {
      curr = this.getAvailableMove(curr);
    }
    if (curr[0] >= this.height - 1) return this.sand;
    this.matrix[curr[0]][curr[1]] = true;
    this.sand++;
    return this.count();
  }

  getAvailableMove(curr) {
    console.log(curr[0]);
    if (curr[0] >= this.height - 1) return false;
    if (this.isAvailable(curr[0] + 1, curr[1])) {
      return [curr[0] + 1, curr[1]];
    } else if (this.isAvailable(curr[0] + 1, curr[1] - 1)) {
      return [curr[0] + 1, curr[1] - 1];
    } else if (this.isAvailable(curr[0] + 1, curr[1] + 1)) {
      return [curr[0] + 1, curr[1] + 1];
    } else {
      return false;
    }
  }

  isAvailable(y, x) {
    return !this.matrix[y][x];
  }

  parse() {
    const data = readFileSync(this.path).toString().split("\n");
    data.pop();
    const lines = data.map((line) =>
      line.split("->").map((num) =>
        num
          .trim()
          .split(",")
          .map((i) => parseInt(i))
      )
    );
    const blocked = lines.map((line) => this.expand(line)).flat();
    this.height = Math.max(...blocked.map((rock) => rock[1])) + 1;
    this.width = Math.max(...blocked.map((rock) => rock[0])) + 1;
    const matrix = new Array(this.height)
      .fill(0)
      .map(() => new Array(this.width).fill(0).map(() => false));
    blocked.forEach((rock) => {
      matrix[rock[1]][rock[0]] = true;
    });
    return matrix;
  }

  expand(line) {
    const drawn = [line[0]];
    for (let i = 0; i < line.length - 1; i++) {
      const start = line[i];
      const end = line[i + 1];
      if (start[0] == end[0]) {
        if (start[1] < end[1]) {
          for (let i = start[1] + 1; i <= end[1]; i++) {
            drawn.push([start[0], i]);
          }
        } else if (start[1] > end[1]) {
          for (let i = end[1]; i < start[1]; i++) {
            drawn.push([start[0], i]);
          }
        }
      } else if (start[1] == end[1]) {
        if (start[0] < end[0]) {
          for (let i = start[0] + 1; i <= end[0]; i++) {
            drawn.push([i, start[1]]);
          }
        } else if (start[0] > end[0]) {
          for (let i = end[0]; i < start[0]; i++) {
            drawn.push([i, start[1]]);
          }
        }
      }
    }
    return drawn;
  }
}

module.exports = SandCounter;
