const TreeVisibilityCalculator = require("./treeVisibilityCalculator.js");

describe("TreeVisibilityCalculator", () => {
  it("Parses matrix", () => {
    const calculator = new TreeVisibilityCalculator("./day-8/mock.txt");
    expect(calculator.matrix).toEqual([
      ["3", "0", "3", "7", "3"],
      ["2", "5", "5", "1", "2"],
      ["6", "5", "3", "3", "2"],
      ["3", "3", "5", "4", "9"],
      ["3", "5", "3", "9", "0"],
    ]);
  });

  it("Counts visible trees", () => {
    const calculator = new TreeVisibilityCalculator("./day-8/mock.txt");
    expect(calculator.countVisibleTrees()).toEqual(21);
  });
});
