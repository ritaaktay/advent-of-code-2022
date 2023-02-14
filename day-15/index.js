const SignalReader = require("./signalReader");
const reader = new SignalReader("./day-15/input.txt");
console.log("Part 1: ", reader.calculate(2000000));
console.log("Part 2: ", reader.findBeacon(4000000));
