const { readFileSync } = require("fs");

class ScoreCounter {
  constructor(path) {
    this.path = path;
    // A Rock - 1
    // B Paper - 2
    // C Scissors - 3

    // X Lose
    // Y Draw
    // Z Win

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

const scoreCounter = new ScoreCounter("./day-2/input.txt");
console.log(scoreCounter.count());

module.exports = ScoreCounter;
