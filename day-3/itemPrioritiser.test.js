const ItemPriotitiser = require("./itemPrioritiser");

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

  it("finds repeating item in a rucksack", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    const rucksack = "vJrwpWtwJgWrhcsFMMfFFhFp";
    expect(prioritiser.getRepeatingItem(rucksack)).toEqual("p");
  });

  it("finds repeating item in a rucksack", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    const rucksack = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL";
    expect(prioritiser.getRepeatingItem(rucksack)).toEqual("L");
  });

  it("finds repeating item in a rucksack", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    const rucksack = "PmmdzqPrVvPwwTWBwg";
    expect(prioritiser.getRepeatingItem(rucksack)).toEqual("P");
  });

  it("finds repeating item in a rucksack", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    const rucksack = "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn";
    expect(prioritiser.getRepeatingItem(rucksack)).toEqual("v");
  });

  it("finds repeating item in a rucksack", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    const rucksack = "ttgJtRGJQctTZtZT";
    expect(prioritiser.getRepeatingItem(rucksack)).toEqual("t");
  });

  it("finds repeating item in a rucksack", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    const rucksack = "CrZsJsPPZsGzwwsLwLmpwMDw";
    expect(prioritiser.getRepeatingItem(rucksack)).toEqual("s");
  });

  it("maps repeating items with priority scores", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    expect(prioritiser.getPriorities()).toEqual([16, 38, 42, 22, 20, 19]);
  });

  it("gets total priority score", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    expect(prioritiser.getTotalPriorities()).toEqual(157);
  });

  it("gets badge from group of three rucksacks", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    const badge = prioritiser.getBadge([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ]);
    expect(badge).toEqual("r");
  });

  it("gets badge from group of three rucksacks", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    const badge = prioritiser.getBadge([
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]);
    expect(badge).toEqual("Z");
  });

  it("gets priorities for all badges", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    expect(prioritiser.getPrioritiesForBadges()).toEqual([18, 52]);
  });

  it("gets total priorities for all badges", () => {
    path = "./day-3/mock.txt";
    const prioritiser = new ItemPriotitiser(path);
    expect(prioritiser.getTotalPrioritiesForBadges()).toEqual(70);
  });
});
