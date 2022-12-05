const ScoreCounter = require("./scoreCounter");

describe("ScoreCOunter", () => {
  it("Finds total score", () => {
    const path = "./Day-2/mock.txt";
    const scoreCounter = new ScoreCounter(path);
    expect(scoreCounter.count()).toEqual(12);
  });
});
