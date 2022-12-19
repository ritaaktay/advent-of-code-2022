const RopeModeller = require("./ropeModeller.js");

describe("RopeModeller", () => {
  it("Parses instructions", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    expect(modeller.moves).toEqual([
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

  it("Adds only uniqe values to trail", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.addToTrail();
    expect(modeller.trail.length).toEqual(1);
  });

  it("Adds only uniqe values to trail", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.tail.x = 1;
    modeller.addToTrail();
    expect(modeller.trail.length).toEqual(2);
  });

  it("Checks if touching", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    expect(modeller.isTouching()).toEqual(true);
  });

  it("Checks if touching", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.head.x++;
    expect(modeller.isTouching()).toEqual(true);
  });

  it("Checks if touching", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.head.x++;
    modeller.head.y++;
    expect(modeller.isTouching()).toEqual(true);
  });

  it("Checks if touching", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.head.x++;
    modeller.head.y++;
    modeller.head.y++;
    expect(modeller.isTouching()).toEqual(false);
  });

  it("Moves head right", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.moveHead("R");
    expect(modeller.head.x).toEqual(1);
  });

  it("Moves head up", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.moveHead("U");
    expect(modeller.head.y).toEqual(1);
  });

  it("Moves head left", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.moveHead("R");
    modeller.moveHead("L");
    expect(modeller.head.x).toEqual(0);
  });

  it("Moves head down", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.moveHead("U");
    modeller.moveHead("D");
    expect(modeller.head.y).toEqual(0);
  });

  it("Processes a move", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    modeller.moves = [["R", 2]];
    const spyMoveHead = jest.spyOn(modeller, "moveHead");
    const spyMoveTail = jest.spyOn(modeller, "moveTail");
    modeller.processMoves();
    expect(spyMoveHead).toHaveBeenNthCalledWith(2, "R");
    expect(spyMoveTail).toHaveBeenCalledTimes(1);
    expect(modeller.trail.length).toEqual(2);
  });

  it("Processes all moves", () => {
    const modeller = new RopeModeller("./day-9/mock.txt");
    expect(modeller.processMoves()).toEqual(13);
  });
});
