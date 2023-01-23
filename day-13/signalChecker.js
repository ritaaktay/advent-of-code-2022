const { readFileSync } = require("fs");

class SignalChecker {
  constructor(path) {
    this.path = path;
    this.data = this.parse();
  }

  parse() {
    const lines = readFileSync(this.path).toString().split("\n");
    lines.pop();
  }
}

module.exports = SignalChecker;
