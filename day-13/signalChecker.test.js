const SignalChecker = require("./SignalChecker");

describe("", () => {
  it("compares a pair", () => {
    const checker = new SignalChecker("./day-13/mock.txt");
    expect(checker.isInOrder([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toEqual(true);
  });

  it("compares a pair", () => {
    const checker = new SignalChecker("./day-13/mock.txt");
    expect(checker.isInOrder([[1], [2, 3, 4]], [[1], 4])).toEqual(true);
  });

  it("count pairs in right order", () => {
    const checker = new SignalChecker("./day-13/mock.txt");
    expect(checker.countRightPairs()).toEqual(13);
  });
});
