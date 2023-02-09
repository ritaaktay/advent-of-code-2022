const { readFileSync } = require("fs");

class SignalChecker {
  constructor(path) {
    this.path = path;
    this.blocked = this.parse();
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

module.exports = SignalChecker;
