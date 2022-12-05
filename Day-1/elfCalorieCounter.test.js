const ElfCalorieCounter = require("./elfCalorieCounter.js");

describe("CalorieCounter", () => {
  it("Finds total calories of elf with most calories", () => {
    const path = "./Day-1/mock.txt";
    const elfCalCounter = new ElfCalorieCounter(path);
    expect(elfCalCounter.getElfWithMostCalories()).toEqual(24000);
  });

  it("Finds total calories of top three elves with most calories", () => {
    const path = "./Day-1/mock.txt";
    const elfCalCounter = new ElfCalorieCounter(path);
    expect(elfCalCounter.getTopThreeElvesWithMostCalories()).toEqual(45000);
  });
});
