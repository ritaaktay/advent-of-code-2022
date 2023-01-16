const HillCLimber = require("./hillClimber.js");

describe("HillClimber", () => {
  it("Has a matrix fro the height map", () => {
    const climber = new HillCLimber("./day-12/mock.txt");
    expect(climber.map[0][0]).toEqual({
      x: 0,
      y: 0,
      value: "S",
      visited: false,
      steps: Infinity,
    });
    expect(climber.map[2][5]).toEqual({
      x: 2,
      y: 5,
      value: "E",
      visited: false,
      steps: Infinity,
    });
    expect(climber.map[2][6]).toEqual({
      x: 2,
      y: 6,
      value: "x",
      visited: false,
      steps: Infinity,
    });
  });

  it("Has a starting coordinate", () => {
    const climber = new HillCLimber("./day-12/mock.txt");
    expect(climber.start).toEqual({ x: 0, y: 0 });
  });

  it("Does a BFS traversal", () => {
    const climber = new HillCLimber("./day-12/mock.txt");
    expect(climber.findShortestPathFromStart()).toEqual(31);
  });

  it("Finds shortest path from any point 'a'", () => {
    const climber = new HillCLimber("./day-12/mock.txt");
    expect(climber.findShortestPathFromAnyA()).toEqual(29);
  });
});
