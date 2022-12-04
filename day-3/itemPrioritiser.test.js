const ItemPriotitiser = require("./itemPriotitiser");

describe("ItemPriotitiser", () => {
  it("has priority hash", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    prioritiser.getPriorityHash();
    expect(prioritiser.priorityHash["a"]).toEqual(1);
    expect(prioritiser.priorityHash["z"]).toEqual(26);
    expect(prioritiser.priorityHash["A"]).toEqual(27);
    expect(prioritiser.priorityHash["Z"]).toEqual(52);
  });

  it("has rucksacks array", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    expect(prioritiser.rucksacks).toEqual([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]);
  });
});
