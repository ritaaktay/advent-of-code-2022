const DirectoryCalculator = require("./directoryCalculator");
const DirectoryCreator = require("./directoryCreator");

const calculator = new DirectoryCalculator();
const root = new DirectoryCreator().create("./day-7/input.txt");
console.log(calculator.pickSmallestAbove(root, 70000000, 30000000));
