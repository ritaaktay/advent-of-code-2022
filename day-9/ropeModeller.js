const { readFileSync } = require("fs");

class RopeModeller {
  constructor(path) {
    this.moves = this.#parse(path);
    this.head = { x: 0, y: 0 };
    this.tail = { x: 0, y: 0 };
    this.trail = [];
  }

  processMoves() {
    this.moves.forEach((move) => {
      const [dir, amount] = move;
      for (let i = 0; i < amount; i++) {
        this.moveHead(dir);
        if (this.isTouching()) continue;
        this.moveTail();
        this.addToTrail();
      }
    });
    return this.trail.length;
  }

  addToTrail() {
    if (
      !this.trail.some((pos) => pos.x == this.tail.x && pos.y == this.trail.y)
    ) {
      this.trail.push(this.tail);
    }
  }

  moveTail() {
    if (this.head.y > this.tail.y) this.tail.y++;
    if (this.head.y < this.tail.y) this.tail.y--;
    if (this.head.x > this.tail.x) this.tail.x++;
    if (this.head.x < this.tail.x) this.tail.x--;
  }

  moveHead(dir) {
    if (dir == "R") this.head.x++;
    if (dir == "L") this.head.x--;
    if (dir == "U") this.head.y++;
    if (dir == "D") this.head.y--;
  }

  isTouching() {
    for (let x = this.tail.x - 1; x <= this.tail.x + 1; x++) {
      for (let y = this.tail.y - 1; y <= this.tail.y + 1; y++) {
        if (x == this.head.x && y == this.head.y) return true;
      }
    }
    return false;
  }

  #parse(path) {
    const rows = readFileSync(path).toString().split("\n");
    rows.pop();
    return rows.map((move) => {
      const regex = /([A-Z]) ([\d]+)/;
      const match = regex.exec(move);
      return [match[1], parseInt(match[2])];
    });
  }
}

module.exports = RopeModeller;
