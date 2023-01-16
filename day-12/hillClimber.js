const { readFileSync } = require("fs");

class HillCLimber {
  constructor(path) {
    this.path = path;
    this.map = this.makeMap();
  }

  findShortestPath() {
    let queue = [this.map[this.start.x][this.start.y]];
    while (queue.length > 0) {
      let current = queue.shift();
      const neighbours = this.getNeighbours(current);
      neighbours.forEach((n) => {
        if (this.isVisitable(current, n) && !n.visited) {
          if (current.steps + 1 < n.steps) n.steps = current.steps + 1;
          n.visited = true;
          queue.push(n);
        }
      });
    }
    return this.map[this.end.x][this.end.y].steps;
  }

  getNeighbours(current) {
    const neighbours = [];
    if (current.x - 1 >= 0) neighbours.push(this.map[current.x - 1][current.y]);
    if (current.x + 1 < this.map.length) {
      neighbours.push(this.map[current.x + 1][current.y]);
    }
    if (current.y - 1 >= 0) neighbours.push(this.map[current.x][current.y - 1]);
    if (current.y + 1 < this.map[0].length) {
      neighbours.push(this.map[current.x][current.y + 1]);
    }
    return neighbours;
  }

  makeMap() {
    const lines = readFileSync(this.path).toString().split("\n");
    let map = lines.slice(0, lines.length - 1).map((row) => row.split(""));
    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[x].length; y++) {
        if (map[x][y] == "S") this.start = { x: x, y: y };
        if (map[x][y] == "E") this.end = { x: x, y: y };
        map[x][y] = {
          x: x,
          y: y,
          value: map[x][y],
          visited: map[x][y] == "S" ? true : false,
          steps: map[x][y] == "S" ? 0 : Infinity,
        };
      }
    }
    return map;
  }

  isVisitable(current, next) {
    let c = current.value == "S" ? "a" : current.value;
    let n = next.value == "E" ? "z" : next.value;
    return c.charCodeAt() - n.charCodeAt() >= -1;
  }
}

module.exports = HillCLimber;
