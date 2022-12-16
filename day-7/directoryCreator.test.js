const Dir = require("./dir.js");
const DirectoryCreator = require("./directoryCreator.js");

describe("Directory Creator", () => {
  it("processes instructions", () => {
    const creator = new DirectoryCreator();
    creator.create("./day-7/mock.txt");
    expect(this.root).toEqual(new Dir(null, "/"));
  });
});
