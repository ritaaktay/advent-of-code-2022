const SignalChecker = require("./SignalChecker");

describe("", () => {
  it("", () => {
    const checker = new SignalChecker("./day-13/mock.txt");
  });

  it("gets substrings", () => {
    const checker = new SignalChecker("./day-13/mock.txt");
    expect(checker.getSubString("[[1],[2,3,4]]", 5)).toEqual("[2,3,4]");
    expect(checker.getSubString("[1,[2,[3,[4,[5,6,7]]]],8,9]", 3)).toEqual(
      "[2,[3,[4,[5,6,7]]]]"
    );
  });

  it("parses nested arrays", () => {
    const checker = new SignalChecker("./day-13/mock.txt");
    expect(checker.makeArray("[[1],[2,3,4]]", 5)).toEqual([[1], [2, 3, 4]]);
  });
});
