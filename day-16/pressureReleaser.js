const { readFileSync } = require("fs");

class SignalReader {
  constructor(path) {
    this.path = path;
    this.valves = this.parse();
    console.log(this.valves);
  }

  parse() {
    const data = readFileSync(this.path).toString().split("\n");
    return data.map((string) => {
      const match = string.match(
        /(\w\w) has flow rate=(\d+); tunnels* leads* to valves* ((\w\w)(, \w\w)*)/
      );
      return {
        name: match[1],
        flowRate: parseInt(match[2]),
        tunnelsTo: match[3].split(", "),
      };
    });
  }
}

module.exports = SignalReader;
