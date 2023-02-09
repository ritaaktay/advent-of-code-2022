const { readFileSync } = require("fs");

class SandCounter {
  constructor(path) {
    this.path = path;
    this.blocked = this.parse();
    this.greatest = Math.max(...this.blocked.map((rock) => rock[1]));
    this.sand = 0;
  }

  count() {
    let curr = [500, 0];
    while (this.getAvailableMove(curr)) {
      curr = this.getAvailableMove(curr);
    }
    if (curr[1] + 1 > this.greatest) return this.sand;
    this.blocked.push(curr);
    this.sand++;
    return this.count();
  }

  getAvailableMove(curr) {
    if (curr[1] + 1 > this.greatest) return false;
    if (this.isAvailable([curr[0], curr[1] + 1])) {
      return [curr[0], curr[1] + 1];
    } else if (this.isAvailable([curr[0] - 1, curr[1] + 1])) {
      return [curr[0] - 1, curr[1] + 1];
    } else if (this.isAvailable([curr[0] + 1, curr[1] + 1])) {
      return [curr[0] + 1, curr[1] + 1];
    } else {
      return false;
    }
  }

  isAvailable(point) {
    for (let i = 0; i < this.blocked.length; i++) {
      if (JSON.stringify(this.blocked[i]) == JSON.stringify(point)) {
        return false;
      }
    }
    return true;
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
    return lines.map((line) => this.expand(line)).flat();
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
