const SignalChecker = require("./signalChecker");
const checker = new SignalChecker("./day-13/input.txt");
console.log("Part 1: ", checker.countRightPairs());
console.log("Part 2: ", checker.findDividers());
