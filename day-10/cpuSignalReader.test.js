const CPUSignalReader = require("./cpuSignalReader.js");

describe("CPUSignalReader", () => {
  xit("Parses instructions", () => {
    const reader = new CPUSignalReader("./day-10/mock.txt");
    reader.signals = ["noop", "addx 3", "addx -5"];
    reader.calculateSignalStrengthsAtEachCycle();
    expect(reader.cycles).toEqual([1, 1, 2, 3, 16, 20]);
    expect(reader.x).toEqual(-1);
  });

  it("Parses instructions", () => {
    const reader = new CPUSignalReader("./day-10/mock.txt");
    expect(reader.getSignalTotalEvery40()).toEqual(13140);
  });
});
