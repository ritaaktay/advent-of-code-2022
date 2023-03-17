const SignalReader = require("./signalReader");
const reader = new SignalReader("./day-15/input.txt");
console.log("Part 1: ", reader.noBeaconSpotsInRow(2000000));
const time = Date.now();
console.log("Part 2: ", reader.findBeaconAtRow(4000000));
console.log(`Time: ${(Date.now() - time) / 1000}s`);
