const SignalReader = require("./signalReader");

describe("", () => {
  it("calculates", () => {
    const reader = new SignalReader("./day-15/mock.txt", 10);
    expect(reader.calculate()).toEqual(26);
  });
});
