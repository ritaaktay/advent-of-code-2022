const SandCounter = require("./sandCounter");
const counterOne = new SandCounter("./day-14/input.txt", false);
console.log("Part 1: ", counterOne.simulate());
const counterTwo = new SandCounter("./day-14/input.txt", true);
console.log("Part 2: ", counterTwo.simulate());
