const SignalReader = require("./signalReader");

describe("", () => {
  it("parses data", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    expect(reader.data).toEqual([
      [2, 18, -2, 15, 7],
      [9, 16, 10, 16, 1],
      [13, 2, 15, 3, 3],
      [12, 14, 10, 16, 4],
      [10, 20, 10, 16, 4],
      [14, 17, 10, 16, 5],
      [8, 7, 2, 10, 9],
      [2, 0, 2, 10, 10],
      [0, 11, 2, 10, 3],
      [20, 14, 25, 17, 8],
      [17, 20, 21, 22, 6],
      [16, 7, 15, 3, 5],
      [14, 3, 15, 3, 1],
      [20, 1, 15, 3, 7],
    ]);
  });

  it("calculates", () => {
    const reader = new SignalReader("./day-15/mock.txt");
    expect(reader.calculate(10)).toEqual(26);
  });
});
