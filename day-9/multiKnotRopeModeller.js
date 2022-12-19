const { readFileSync } = require("fs");

class MultiKnotRopeModeller {
  constructor(path, length = 10) {
    this.moves = this.#parse(path);
    this.length = length;
    this.knots = this.makeKnots(length);
    this.trail = [{ x: 0, y: 0 }];
  }

  makeKnots(length) {
    const array = [];
    for (let i = 0; i < length; i++) array.push({ x: 0, y: 0 });
    return array;
  }

  processMoves() {
    this.moves.forEach((move) => {
      const [dir, amount] = move;
      for (let i = 0; i < amount; i++) {
        this.knots[0] = this.moveHead(this.knots[0], dir);
        for (let i = 0; i < this.knots.length - 1; i++) {
          if (this.isTouching(this.knots[i], this.knots[i + 1])) continue;
          this.knots[i + 1] = this.moveTail(this.knots[i], this.knots[i + 1]);
        }
        this.addToTrail(this.knots[this.knots.length - 1]);
      }
    });
    return this.trail.length;
  }

  addToTrail(tail) {
    if (!this.trail.some((pos) => pos.x == tail.x && pos.y == tail.y)) {
      this.trail.push({ ...tail });
    }
  }

  moveTail(head, tail) {
    if (head.y > tail.y) tail.y++;
    if (head.y < tail.y) tail.y--;
    if (head.x > tail.x) tail.x++;
    if (head.x < tail.x) tail.x--;
    return tail;
  }

  moveHead(head, dir) {
    if (dir == "R") head.x++;
    if (dir == "L") head.x--;
    if (dir == "U") head.y++;
    if (dir == "D") head.y--;
    return head;
  }

  isTouching(head, tail) {
    for (let x = tail.x - 1; x <= tail.x + 1; x++) {
      for (let y = tail.y - 1; y <= tail.y + 1; y++) {
        if (x == head.x && y == head.y) return true;
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

module.exports = MultiKnotRopeModeller;
