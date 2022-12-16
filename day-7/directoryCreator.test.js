const Dir = require("./dir.js");
const DirectoryCreator = require("./directoryCreator.js");

describe("Directory Creator", () => {
  it("processes instructions", () => {
    const creator = new DirectoryCreator();
    creator.create("./day-7/mock.txt");
    expect(creator.root.name).toEqual("/");
    expect(creator.root.parent).toEqual(null);
    expect(creator.root.files).toEqual([14848514, 8504156]);
    const a = creator.root.children[0];
    expect(a.name).toEqual("a");
    expect(a.files).toEqual([29116, 2557, 62596]);
    const e = a.children[0];
    expect(e.name).toEqual("e");
    expect(e.files).toEqual([584]);
    const d = creator.root.children[1];
    expect(d.name).toEqual("d");
    expect(d.files).toEqual([4060174, 8033020, 5626152, 7214296]);
  });
});
