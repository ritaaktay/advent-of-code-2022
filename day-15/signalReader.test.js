const SignalReader = require("./signalReader");

describe("", () => {
  it("calculates", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    expect(reader.calculate(10)).toEqual(26);
  });

  it("calculates scan range of a scanner on the row in question", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    expect(reader.getScanRange([8, 7, 2, 10, 9], 10)).toEqual([2, 14]);
  });

  it("concats ranges to remove overlaps", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    const ranges = [
      [12, 12],
      [2, 14],
      [2, 2],
      [-2, 2],
      [16, 24],
      [14, 18],
    ];
    const result = reader.joinRanges(ranges);
    expect(result).toEqual([[-2, 24]]);
  });

  it("concats ranges to remove overlaps", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    const ranges = [
      [12, 12],
      [2, 14],
      [2, 2],
      [-2, 2],
      [16, 24],
      [14, 18],
    ];
    const result = reader.joinRanges(ranges);
    expect(result).toEqual([[-2, 24]]);
  });

  it("checks if there is any overlap betweenr anges", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    expect(
      reader.noneOverlap([
        [-2, 18],
        [14, 24],
      ])
    ).toEqual(false);
  });

  it("finds beacon", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    expect(reader.findBeacon()).toEqual(56000011);
  });

  it("concatenates ranges without infinite recursion", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    expect(
      reader.joinRanges([
        [-3, 13],
        [15, 25],
        [15, 25],
        [15, 25],
        [15, 17],
        [15, 17],
        [15, 17],
      ])
    ).toEqual([
      [-3, 13],
      [15, 25],
    ]);
  });
});
