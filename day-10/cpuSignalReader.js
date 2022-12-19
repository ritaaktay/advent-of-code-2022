const { readFileSync } = require("fs");

class CPUSignalReader {
  constructor(path) {
    this.signals = this.#parse(path);
    this.cycles = [1];
    this.x = 1;
    this.total = 0;
  }

  getSignalTotalEvery40() {
    this.calculateSignalStrengthsAtEachCycle();
    let total = 0;
    for (let i = 20; i <= 220; i += 40) {
      total += this.cycles[i];
    }
    return total;
  }

  calculateSignalStrengthsAtEachCycle() {
    this.signals.forEach((signal) => {
      this.cycles.push(this.cycles.length * this.x);
      const match = /addx (-*[\d]+)/.exec(signal);
      if (match) {
        this.cycles.push(this.cycles.length * this.x);
        this.x += parseInt(match[1]);
      }
      console.log(this.cycles);
    });
  }

  #parse(path) {
    const rows = readFileSync(path).toString().split("\n");
    rows.pop();
    return rows;
  }
}

module.exports = CPUSignalReader;
