const { readFileSync } = require("fs");

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
      if (curr[0] == this.height) return this.sand;
    }
    this.matrix[curr[0]][curr[1]] = true;
    this.sand++;
    return this.count();
  }

  getAvailableMove(curr) {
    if (!this.matrix[curr[0] + 1][curr[1]]) {
      return [curr[0] + 1, curr[1]];
    } else if (!this.matrix[curr[0] + 1][curr[1] - 1]) {
      return [curr[0] + 1, curr[1] - 1];
    } else if (!this.matrix[curr[0] + 1][curr[1] + 1]) {
      return [curr[0] + 1, curr[1] + 1];
    } else return false;
  }

  parse() {
    const data = readFileSync(this.path).toString().split("\n");
    data.pop();
    const lines = data.map((row) =>
      row.split("->").map((line) => line.split(",").map((i) => parseInt(i)))
    );
    const rocks = lines.map((line) => this.draw(line)).flat();
    this.height = Math.max(...rocks.map((rock) => rock[1]));
    this.width = Math.max(...rocks.map((rock) => rock[0]));
    const matrix = new Array(this.height + 1)
      .fill()
      .map(() => new Array(this.width + 1).fill().map(() => false));
    rocks.forEach((rock) => {
      matrix[rock[1]][rock[0]] = true;
    });
    return matrix;
  }

  draw(line) {
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
