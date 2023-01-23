const { readFileSync } = require("fs");

class SignalChecker {
  constructor(path) {
    this.path = path;
    this.data = this.parse();
    console.log(this.data);
  }

  isInOrder(left, right) {
    if (right.length < left.length) return false;
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
    return pairs.map((p) => p.map((s) => this.makeArray(s)));
  }

  getSubString(str, start) {
    let match = 1;
    for (let i = start + 1; i < str.length; i++) {
      if (str[i] == "[") match++;
      if (str[i] == "]") match--;
      if (match == 0) return str.substring(start, i + 1);
    }
  }

  makeArray(str) {
    const array = [];
    let i = 1;
    while (i < str.length - 1) {
      if (str[i] == "[") {
        const sub = this.getSubString(str, i);
        array.push(this.makeArray(sub));
        i = i + sub.length;
      } else {
        if (str[i] != ",") array.push(parseInt(str[i]));
        i++;
      }
    }
    return array;
  }
}

module.exports = SignalChecker;
