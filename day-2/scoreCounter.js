const { readFileSync } = require("fs");

class ScoreCounter {
  constructor(path) {
    this.path = path;
  }

  count() {
    console.log(this.splitRounds());
  }

  splitRounds() {
    return readFileSync(this.path).toString().split("\n");
  }
}

module.exports = ScoreCounter;
