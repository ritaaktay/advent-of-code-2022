const SignalReader = require("./signalReader");
const reader = new SignalReader("./day-15/input.txt", 2000000);
console.log("Part 1: ", reader.calculate());
