const ElfCalorieCounter = require("./elfCalorieCounter.js");

describe("CalorieCounter", () => {
  it("Has a calories list", () => {
    const path = "./Day-1/mock.txt";
    const elfCalCounter = new ElfCalorieCounter(path);
    expect(elfCalCounter.getElfWithMostCalories()).toEqual(24000);
  });
});
