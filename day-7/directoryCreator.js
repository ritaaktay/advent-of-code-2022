const Dir = require("./dir");
const { readFileSync } = require("fs");

class DirectoryCreator {
  constructor() {
    this.root = new Dir(null, "/");
  }

  create(path) {
    let instructions = this.#parse(path);
    for (let i = 0; i < instructions.length; i++) {
      let instruction = instructions[i];
      if (instruction.startsWith("$ cd ")) this.#move(instruction);
      else if (instruction == "$ ls") continue;
      else if (instruction.startsWith("dir ")) this.#addDir(instruction);
      else this.#addFile(instruction);
    }
    return this.root;
  }

  #addFile(instruction) {
    const size = /^([\d]+) [a-z.]+$/.exec(instruction)[1];
    this.current.addFile(parseInt(size));
  }

  #addDir(instruction) {
    const filename = /^dir ([a-z.]+)$/.exec(instruction)[1];
    this.current.addChild(new Dir(this.current, filename));
  }

  #move(instruction) {
    const regex = /^\$ cd ([a-zA-Z]*|..|\/)$/;
    const match = regex.exec(instruction);
    const dir = match[1];
    if (dir == "/") {
      this.current = this.root;
    } else if (dir == "..") {
      this.current = this.current.parent;
    } else {
      this.current = this.current.children.find((child) => child.name == dir);
    }
  }

  #parse(path) {
    const instructions = readFileSync(path).toString().split("\n");
    instructions.pop();
    return instructions;
  }
}

module.exports = DirectoryCreator;
