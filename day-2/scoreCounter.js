const { readFileSync } = require("fs");

class ScoreCounter {
  constructor(path) {
    this.path = path;

    this.legend = {
      "A X": 3,
      "B Y": 2,
      "C Z": 1,
      "A Y": 1,
      "B Z": 3,
      "C X": 2,
      "A Z": 2,
      "B X": 1,
      "C Y": 3,
      "X": 0,
      "Y": 3,
      "Z": 6,
    };
  }

  count() {
    return this.splitRounds()
      .map((round) => this.getScore(round))
      .reduce((a, b) => a + b);
  }

  getScore(round) {
    return this.legend[round[2]] + this.legend[round];
  }

  splitRounds() {
    return readFileSync(this.path).toString().split("\n");
  }
}

const scoreCounter = new ScoreCounter("./Day-2/input.txt");
console.log(scoreCounter.count());

module.exports = ScoreCounter;
