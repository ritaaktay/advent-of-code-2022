const TreeScenicScorer = require("./treeScenicScorer");

describe("TreeScenicScorer", () => {
  it("Parses matrix", () => {
    const calculator = new TreeScenicScorer("./day-8/mock.txt");
    expect(calculator.matrix).toEqual([
      ["3", "0", "3", "7", "3"],
      ["2", "5", "5", "1", "2"],
      ["6", "5", "3", "3", "2"],
      ["3", "3", "5", "4", "9"],
      ["3", "5", "3", "9", "0"],
    ]);
  });

  xit("Gets highest scenic score", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getTreeWithHighestScenicScore()).toEqual(8);
  });

  it("Counts scenic score on left", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreLeft(1, 2)).toEqual(1);
  });

  it("Counts scenic score on left", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreLeft(3, 2)).toEqual(2);
  });

  it("Counts scenic score on left", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreLeft(3, 0)).toEqual(0);
  });

  it("Counts scenic score on right", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreRight(1, 2)).toEqual(2);
  });

  it("Counts scenic score on right", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreRight(3, 2)).toEqual(2);
  });

  it("Counts scenic score on right", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreRight(3, 4)).toEqual(0);
  });

  it("Counts scenic score on top", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreTop(1, 2)).toEqual(1);
  });

  it("Counts scenic score on top", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreTop(3, 2)).toEqual(2);
  });

  it("Counts scenic score on top", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreTop(0, 0)).toEqual(0);
  });

  it("Counts scenic score on bottom", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreBottom(1, 2)).toEqual(2);
  });

  it("Counts scenic score on bottom", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreBottom(3, 2)).toEqual(1);
  });

  it("Counts scenic score on bottom", () => {
    const scorer = new TreeScenicScorer("./day-8/mock.txt");
    expect(scorer.getScoreBottom(4, 0)).toEqual(0);
  });
});
