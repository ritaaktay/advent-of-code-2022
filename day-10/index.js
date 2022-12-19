const CPUSignalReader = require("./cpuSignalReader");
const reader = new CPUSignalReader("./day-10/input.txt");
console.log(reader.getSignalTotalEvery40());
