const { readFileSync } = require("fs");

class ScoreCounter {
  constructor(path) {
    this.path = path;
    // A Rock
    // B Paper
    // C Scissors
    // X Rock
    // Y Paper
    // Z Scissors

    // Rock defeats Scissors
    // Scissors defeats Paper
    // Paper defeats Rock

    // Rock 1
    // Paper 2
    // Scissors 3

    // Lost 0
    // Draw 3
    // Win 6

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
      "X": 1,
      "Y": 2,
      "Z": 3,
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
