const Dir = require("./dir");

describe("Dir", () => {
  it("Has a name", () => {
    const dir = new Dir(null, "a");
    expect(dir.name).toEqual("a");
  });

  it("Has a parent", () => {
    const parent = new Dir(null, "a");
    const child = new Dir(parent, "a");
    expect(child.parent).toEqual(parent);
  });

  it("Can add a file", () => {
    const dir = new Dir(null, "a");
    dir.addFile(129875);
    dir.addFile(3423);
    expect(dir.files).toEqual([129875, 3423]);
  });

  it("Can add a child", () => {
    const parent = new Dir(null, "a");
    const child = new Dir(parent, "a");
    parent.addChild(child);
    expect(parent.children).toEqual([child]);
  });

  it("Calculates total file size", () => {
    const dir = new Dir(null, "a");
    dir.addFile(12);
    dir.addFile(18);
    expect(dir.size()).toEqual(30);
  });

  it("Calculates total file size recursively for all children", () => {
    const parent = new Dir(null, "a");
    parent.addFile(12);
    parent.addFile(18);
    const child = new Dir(parent, "b");
    parent.addChild(child);
    child.addFile(12);
    child.addFile(18);
    expect(parent.size()).toEqual(60);
  });
});

describe("DirectoryCreator", () => {
  it("Parses instructions", () => {});
});

describe("DirectoryCalculator", () => {
  it("", () => {});
});
