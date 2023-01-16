const { readFileSync } = require("fs");

class HillCLimber {
  constructor(path) {
    this.path = path;
    this.map = this.makeMap();
  }

  findShortestPathFromStart() {
    return this.findShortestPath(this.start.x, this.start.y);
  }

  findShortestPathFromAnyA() {
    let min = Infinity;
    for (let x = 0; x < this.map.length; x++) {
      for (let y = 0; y < this.map[x].length; y++) {
        if (this.map[x][y].value == "a" || this.map[x][y].value == "S") {
          this.resetMap();
          const path = this.findShortestPath(x, y);
          if (path < min) min = path;
        }
      }
    }
    return min;
  }

  findShortestPath(x, y) {
    this.map[x][y].visited = true;
    this.map[x][y].steps = 0;
    let queue = [this.map[x][y]];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.value == "E") return current.steps;
      const neighbours = this.getNeighbours(current);
      neighbours.forEach((n) => {
        if (this.isVisitable(current, n) && !n.visited) {
          n.steps = current.steps + 1;
          n.visited = true;
          queue.push(n);
        }
      });
    }
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

  resetMap() {
    for (let x = 0; x < this.map.length; x++) {
      for (let y = 0; y < this.map[x].length; y++) {
        this.map[x][y].visited = false;
        this.map[x][y].steps = Infinity;
      }
    }
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
          visited: false,
          steps: Infinity,
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
