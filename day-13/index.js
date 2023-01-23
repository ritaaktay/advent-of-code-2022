const HillCLimber = require("./hillClimber");
const climber = new HillCLimber("./day-12/input.txt");
console.log("Part 1: ", climber.findShortestPathFromStart());
console.log("Part 2: ", climber.findShortestPathFromAnyA());
