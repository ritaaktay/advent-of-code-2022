const DirectoryCalculator = require("./directoryCalculator");
const DirectoryCreator = require("./directoryCreator");

describe("DirectoryCalculator", () => {
  it("calculates total of directories below 100000", () => {
    const calculator = new DirectoryCalculator();
    const root = new DirectoryCreator().create("./day-7/mock.txt");
    expect(calculator.calculateTotalBelow(root, 100000)).toEqual(95437);
  });

  it("calculates diskspace to free up", () => {
    const calculator = new DirectoryCalculator();
    const root = new DirectoryCreator().create("./day-7/mock.txt");
    expect(calculator.calculateSpaceToFreeUp(root, 70000000, 30000000)).toEqual(
      8381165
    );
  });

  it("calculates the minimum filesize that meets space needed to free up", () => {
    const calculator = new DirectoryCalculator();
    const root = new DirectoryCreator().create("./day-7/mock.txt");
    expect(calculator.pickSmallestAbove(root, 70000000, 30000000)).toEqual(
      24933642
    );
  });
});
