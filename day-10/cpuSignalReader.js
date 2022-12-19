const { readFileSync } = require("fs");

class CPUSignalReader {
  constructor(path) {
    this.signals = this.#parse(path);
  }

  getSignalTotalEvery40() {
    const cycles = this.calculateCycles();
    let total = 0;
    for (let i = 20; i <= 220; i += 40) {
      total += cycles[i] * i;
    }
    return total;
  }

  calculateCycles() {
    const cycles = [1];
    let x = 1;
    this.signals.forEach((signal) => {
      cycles.push(x);
      const match = /addx (-*[\d]+)/.exec(signal);
      if (match) {
        cycles.push(x);
        x += parseInt(match[1]);
      }
    });
    return cycles;
  }

  drawScreen() {
    const cycles = this.calculateCycles();
    return this.makeScreen(cycles)
      .map((row) => {
        return row.map((x) => (x ? "#" : ".")).join("");
      })
      .join("\n");
  }

  makeScreen(cycles) {
    const screen = [];
    for (let r = 0; r < 6; r++) {
      const row = [];
      for (let i = 0; i < 40; i++) {
        const cycle = r * 40 + i + 1;
        row.push(this.pixelIsOfSprite(cycles[cycle], i));
      }
      screen.push(row);
    }
    return screen;
  }

  pixelIsOfSprite(cycle, i) {
    return [i - 1, i, i + 1].includes(cycle);
  }

  #parse(path) {
    const rows = readFileSync(path).toString().split("\n");
    rows.pop();
    return rows;
  }
}

module.exports = CPUSignalReader;
