const DirectoryCalculator = require("./directoryCalculator");
const DirectoryCreator = require("./directoryCreator");

const calculator = new DirectoryCalculator();
const root = new DirectoryCreator().create("./day-7/input.txt");
console.log(calculator.calculate(root));
