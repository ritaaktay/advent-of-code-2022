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
    const files = this.files.reduce((a, b) => a + b, 0);
    const directories = this.children
      .map((child) => child.size())
      .reduce((a, b) => a + b, 0);
    return files + directories;
  }
}

module.exports = Dir;
