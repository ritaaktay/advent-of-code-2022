const { readFileSync } = require("fs");

class SignalChecker {
  constructor(path) {
    this.path = path;
    this.blocked = this.parse();
    this.greatest = this.getGreatest(this.blocked);
  }

  count() {
    return this.move([500, 0], 0);
  }

  move(curr, count) {
    if (curr[1] + 1 > this.greatest) {
      console.log(count);
      return count;
    }
    if (this.isOpen([curr[0], curr[1] + 1])) {
      return this.move([curr[0], curr[1] + 1], count);
    } else if (this.isOpen([curr[0] - 1, curr[1] + 1])) {
      return this.move([curr[0] - 1, curr[1] + 1], count);
    } else if (this.isOpen([curr[0] + 1, curr[1] + 1])) {
      return this.move([curr[0] + 1, curr[1] + 1], count);
    } else {
      this.blocked.push(curr);
      count++;
      return this.move([500, 0], count);
    }
  }

  isOpen(point) {
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

  getGreatest(rocks) {
    const y = rocks.map((rock) => rock[1]);
    return Math.max(...y);
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
