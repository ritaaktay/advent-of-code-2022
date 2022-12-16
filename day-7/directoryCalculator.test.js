const DirectoryCalculator = require("./directoryCalculator");
const DirectoryCreator = require("./directoryCreator");

describe("DirectoryCalculator", () => {
  it("calculates size of root", () => {
    const calculator = new DirectoryCalculator();
    const root = new DirectoryCreator().create("./day-7/mock.txt");
    expect(calculator.calculate(root)).toEqual(95437);
  });
});
