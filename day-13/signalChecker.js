const { readFileSync } = require("fs");

class SignalChecker {
  constructor(path) {
    this.path = path;
    this.data = this.parse();
  }

  findDividers() {
    const list = this.data.flat(1).concat([[[2]], [[6]]]);
    const sorted = list.sort((a, b) => this.isInOrder(a, b));
    let result = 1;
    sorted.forEach((item, index) => {
      if (JSON.stringify(item) === JSON.stringify([[2]])) result *= index + 1;
      if (JSON.stringify(item) === JSON.stringify([[6]])) result *= index + 1;
    });
    return result;
  }

  countRightPairs() {
    let sum = 0;
    this.data.forEach((pair, i) => {
      const [l, r] = pair;
      if (this.isInOrder(l, r) == -1) sum += i + 1;
    });
    return sum;
  }

  isInOrder(l, r) {
    if (typeof l == "number" && typeof r == "number") {
      if (l > r) return 1;
      if (l < r) return -1;
    }

    if (Array.isArray(l) || Array.isArray(r)) {
      if (typeof l == "number") l = [l];
      if (typeof r == "number") r = [r];

      const length = l.length > r.length ? r.length : l.length;

      for (let i = 0; i < length; i++) {
        const result = this.isInOrder(l[i], r[i]);
        if (result == 1 || result == -1) return result;
      }

      if (l.length > r.length) return 1;
      if (r.length > l.length) return -1;
      return 0;
    }
  }

  parse() {
    const pairs = [];
    const lines = readFileSync(this.path)
      .toString()
      .split("\n")
      .filter((i) => i != "");
    for (let i = 0; i < lines.length; i += 2) {
      pairs.push([lines[i], lines[i + 1]]);
    }
    return pairs.map((p) => p.map((s) => JSON.parse(s)));
  }
}

module.exports = SignalChecker;
