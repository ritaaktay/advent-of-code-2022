const RopeModeller = require("./multiKnotRopeModeller");

describe("RopeModeller", () => {
  it("Adds only uniqe values to trail", () => {
    const modeller = new RopeModeller("./day-9/mock-2.txt");
    modeller.addToTrail({ x: 0, y: 0 });
    expect(modeller.trail.length).toEqual(1);
  });

  it("Processes all moves", () => {
    const modeller = new RopeModeller("./day-9/mock-2.txt");
    expect(modeller.processMoves()).toEqual(36);
  });
});
