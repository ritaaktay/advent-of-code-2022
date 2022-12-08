const { readFileSync } = require("fs");

class CommunicationDevice {
  findStartOfPacketMarker(data) {}
}

const data = readFileSync("./day-6/input.txt").toString();
const device = new CommunicationDevice();
console.log(device.findStartOfPacketMarker(data));

module.exports = CommunicationDevice;
