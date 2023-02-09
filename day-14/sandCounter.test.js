const SandCounter = require("./sandCounter");

describe("", () => {
  it("parses rocks", () => {
    const counter = new SandCounter("./day-14/mock.txt");
    expect(JSON.stringify(counter.blocked)).toEqual(
      JSON.stringify([
        [498, 4],
        [498, 5],
        [498, 6],
        [496, 6],
        [497, 6],
        [503, 4],
        [502, 4],
        [502, 5],
        [502, 6],
        [502, 7],
        [502, 8],
        [502, 9],
        [494, 9],
        [495, 9],
        [496, 9],
        [497, 9],
        [498, 9],
        [499, 9],
        [500, 9],
        [501, 9],
      ])
    );
    expect(counter.greatest).toEqual(9);
  });

  it("checks if coordinates are available to move", () => {
    const counter = new SandCounter("./day-14/mock.txt");
    expect(counter.isOpen([500, 9])).toEqual(false);
  });

  it("counts sand", () => {
    const counter = new SandCounter("./day-14/mock.txt");
    expect(counter.count()).toEqual(24);
  });
});
