const CPUSignalReader = require("./cpuSignalReader.js");

describe("CPUSignalReader", () => {
  it("Parses instructions", () => {
    const reader = new CPUSignalReader("./day-10/mock.txt");
    expect(reader.getSignalTotalEvery40()).toEqual(13140);
  });

  it("Draws screen", () => {
    const reader = new CPUSignalReader("./day-10/mock.txt");
    expect(reader.drawScreen()).toEqual(
      "##..##..##..##..##..##..##..##..##..##.." +
        "\n" +
        "###...###...###...###...###...###...###." +
        "\n" +
        "####....####....####....####....####...." +
        "\n" +
        "#####.....#####.....#####.....#####....." +
        "\n" +
        "######......######......######......####" +
        "\n" +
        "#######.......#######.......#######....."
    );
  });
});
