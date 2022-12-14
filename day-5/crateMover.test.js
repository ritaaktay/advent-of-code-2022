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
      "1": ["Z", "N"],
      "2": ["M", "C", "D"],
      "3": ["P"],
    });
  });

  it("moves crates", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    mover.moveCratesOneAtATime("move 1 from 2 to 1");
    expect(mover.stacks).toEqual({
      "1": ["Z", "N", "D"],
      "2": ["M", "C"],
      "3": ["P"],
    });
  });

  it("processes all instructions", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    mover.processInstructions();
    expect(mover.stacks).toEqual({
      "1": ["C"],
      "2": ["M"],
      "3": ["P", "D", "N", "Z"],
    });
  });

  it("gets top crates", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    mover.processInstructions();
    expect(mover.getTopCrates()).toEqual("CMZ");
  });

  it("runs", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    expect(mover.run(false)).toEqual("CMZ");
  });

  it("moves crates all at once", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    mover.moveCratesAllAtOnce("move 1 from 2 to 1");
    expect(mover.stacks).toEqual({
      "1": ["Z", "N", "D"],
      "2": ["M", "C"],
      "3": ["P"],
    });
  });

  it("moves crates all at once", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    mover.moveCratesAllAtOnce("move 1 from 2 to 1");
    mover.moveCratesAllAtOnce("move 3 from 1 to 3");
    expect(mover.stacks).toEqual({
      "1": [],
      "2": ["M", "C"],
      "3": ["P", "Z", "N", "D"],
    });
  });

  it("gets top crates for moving crates all at once", () => {
    path = "./day-5/mock.txt";
    const mover = new CrateMover(path);
    expect(mover.run(true)).toEqual("MCD");
  });
});
