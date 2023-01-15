const HillCLimber = require("./hillClimber.js");

describe("HillClimber", () => {
  it("Has a matrix fro the height map", () => {
    const climber = new HillCLimber("./day-12/mock.txt");
    expect(climber.map[0][0]).toEqual({
      x: 0,
      y: 0,
      value: "S",
      visited: false,
    });
    expect(climber.map[2][5]).toEqual({
      x: 2,
      y: 5,
      value: "E",
      visited: false,
    });
    expect(climber.map[2][6]).toEqual({
      x: 2,
      y: 6,
      value: "x",
      visited: false,
    });
  });

  it("Has a starting coordinate", () => {
    const climber = new HillCLimber("./day-12/mock.txt");
    expect(climber.start).toEqual({ x: 0, y: 0 });
  });

  it("Does a BFS traversal", () => {
    const climber = new HillCLimber("./day-12/mock.txt");
    expect(climber.findShortestPath()).toEqual(31);
  });
});
