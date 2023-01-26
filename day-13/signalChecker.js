const { readFileSync } = require("fs");

class SignalChecker {
  constructor(path) {
    this.path = path;
    this.data = this.parse();
  }

  countRightPairs() {
    let sum = 0;
    this.data.forEach((pair, i) => {
      const [l, r] = pair;
      if (this.isInOrder(l, r)) sum += i + 1;
    });
    return sum;
  }

  isInOrder(l, r) {
    if (typeof l == "number" && typeof r == "number") {
      if (l > r) return false;
      if (l < r) return true;
    }

    if (Array.isArray(l) || Array.isArray(r)) {
      if (typeof l == "number") l = [l];
      if (typeof r == "number") r = [r];

      while (l.length && r.length) {
        const result = this.isInOrder(l.shift(), r.shift());
        if (typeof result == "boolean") return result;
      }

      if (l.length) return false;
      if (r.length) return true;
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
