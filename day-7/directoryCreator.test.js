const DirectoryCreator = require("./directoryCreator.js");

describe("Directory Creator", () => {
  it("processes instructions", () => {
    const creator = new DirectoryCreator();
    const root = creator.create("./day-7/mock.txt");
    expect(root.name).toEqual("/");
    expect(root.parent).toEqual(null);
    expect(root.files).toEqual([14848514, 8504156]);
    const a = root.children[0];
    expect(a.name).toEqual("a");
    expect(a.files).toEqual([29116, 2557, 62596]);
    const e = a.children[0];
    expect(e.name).toEqual("e");
    expect(e.files).toEqual([584]);
    const d = root.children[1];
    expect(d.name).toEqual("d");
    expect(d.files).toEqual([4060174, 8033020, 5626152, 7214296]);
  });
});
