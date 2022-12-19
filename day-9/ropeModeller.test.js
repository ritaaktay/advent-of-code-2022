const RopeModeller = require("./ropeModeller.js");

describe("RopeModeller", () => {
  it("Parses instructions", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    expect(modeller.instructions).toEqual([
      ["R", 4],
      ["U", 4],
      ["L", 3],
      ["D", 1],
      ["R", 4],
      ["D", 1],
      ["L", 5],
      ["R", 2],
    ]);
  });
});
