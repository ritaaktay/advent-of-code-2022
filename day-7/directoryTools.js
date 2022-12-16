const { readFileSync } = require("fs");

class Dir {
  constructor(parent, name) {
    this.name = name;
    this.parent = parent;
    this.files = [];
    this.children = [];
  }

  addFile(file) {
    this.files.push(file);
  }

  addChild(child) {
    this.children.push(child);
  }

  size() {
    const files = this.files.reduce((a, b) => a + b);
    const directories = this.children
      .map((child) => child.size())
      .reduce((a, b) => a + b);
    return files + directories;
  }
}

class DirectoryCreator {
  constructor(path) {
    this.instructions = this.parse(path);
    this.root = new Dir(null, "/");
  }

  getRoot() {
    return this.root;
  }

  processInsturctions() {
    for (let i = 0; i < this.instructions.length; i++) {
      let instruction = this.instructions[i];
      if (instruction.includes("cd")) this.move(instruction);
      else if (instruction == "$ ls") continue;
      else if (instruction.startsWith("dir ")) this.addDir(instruction);
      else this.addFile(instruction);
    }
  }

  addFile(instruction) {
    const size = /^([\d]+) [a-z.]+$/.exec(instruction)[1];
    this.current.addFile(parseInt(size));
  }

  addDir(instruction) {
    const filename = /^dir ([a-z.]+)$/.exec(instruction)[1];
    this.current.addChild(new Dir(this.current), filename);
  }

  move(instruction) {
    const regex = /^$ cd ([a-zA-Z]*|..|\/)$/;
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

  parse(path) {
    return readFileSync(this.path).toString().split("\n");
  }
}

class DirectoryCalculator {
  calculateSizes(root) {}
}

module.exports = { DirectoryCalculator, DirectoryCreator, Dir };
