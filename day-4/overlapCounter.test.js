const OverlapCounter = require("./overlapCounter");

describe("OverlapCounter", () => {
  it("has pairs array", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.pairs).toEqual([
      "2-4,6-8",
      "2-3,4-5",
      "5-7,7-9",
      "2-8,3-7",
      "6-6,4-6",
      "2-6,4-8",
    ]);
  });
});
