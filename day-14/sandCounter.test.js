const SandCounter = require("./sandCounter");

describe("", () => {
  it("parses rocks", () => {
    const counter = new SandCounter("./day-14/mock.txt");
    expect(counter.matrix[4][498]).toEqual(true);
    expect(counter.matrix[5][498]).toEqual(true);
    expect(counter.matrix[6][498]).toEqual(true);
    expect(counter.matrix[6][497]).toEqual(true);
    expect(counter.matrix[6][496]).toEqual(true);
    expect(counter.matrix[4][503]).toEqual(true);
    expect(counter.matrix[4][502]).toEqual(true);
    expect(counter.matrix[5][502]).toEqual(true);
    expect(counter.matrix[6][502]).toEqual(true);
    expect(counter.matrix[7][502]).toEqual(true);
    expect(counter.matrix[8][502]).toEqual(true);
    expect(counter.matrix[9][502]).toEqual(true);
    expect(counter.matrix[9][501]).toEqual(true);
    expect(counter.matrix[9][500]).toEqual(true);
    expect(counter.matrix[9][499]).toEqual(true);
    expect(counter.matrix[9][498]).toEqual(true);
    expect(counter.matrix[9][497]).toEqual(true);
    expect(counter.matrix[9][496]).toEqual(true);
    expect(counter.matrix[9][495]).toEqual(true);
    expect(counter.matrix[9][494]).toEqual(true);
    expect(counter.matrix[6][403]).toEqual(false);
    expect(counter.matrix[1][501]).toEqual(false);
  });

  it("counts sand", () => {
    const counter = new SandCounter("./day-14/mock.txt");
    expect(counter.count()).toEqual(24);
  });
});
