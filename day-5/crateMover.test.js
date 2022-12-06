const CrateMover = require("./CrateMover");

describe("CrateMover", () => {
  it("has instructions array", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    expect(mover.instructions).toEqual([
      "move 1 from 2 to 1",
      "move 3 from 1 to 3",
      "move 2 from 2 to 1",
      "move 1 from 1 to 2",
    ]);
  });

  it("has stacks object", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    expect(mover.stacks).toEqual({
      "1": ["N", "Z"],
      "2": ["D", "C", "M"],
      "3": ["P"],
    });
  });
});
