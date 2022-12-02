const { readFileSync } = require("fs");

class ScoreCounter {
  constructor(path) {
    this.path = path;
    this.legend = {
      "A X": 3,
      "B Y": 3,
      "C Z": 3,
      "A Y": 0,
      "B Z": 0,
      "C X": 0,
      "A Z": 6,
      "B X": 6,
      "C Y": 6,
      "A": 1,
      "B": 2,
      "C": 3,
    };
  }

  count() {
    return this.splitRounds()
      .map((round) => this.getScore(round))
      .reduce((a, b) => a + b);
  }

  getScore(round) {
    return this.legend[round[0]] + this.legend[round];
  }

  splitRounds() {
    return readFileSync(this.path).toString().split("\n");
  }
}

const scoreCounter = new ScoreCounter("./day-2/input.txt");
console.log(scoreCounter.count());

module.exports = ScoreCounter;
