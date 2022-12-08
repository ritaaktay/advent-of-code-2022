const { readFileSync } = require("fs");

class CommunicationDevice {
  findStartOfPacketMarker(data) {
    return this.findStartMarker(data, 4);
  }

  findStartOfMessageMarker(data) {
    return this.findStartMarker(data, 14);
  }

  findStartMarker(data, length) {
    let different = data[0];
    for (let i = 1; i < data.length; i++) {
      if (different.includes(data[i])) {
        const same = different.indexOf(data[i]);
        different = different.substr(same + 1);
      }
      different += data[i];
      if (different.length == length) return i + 1;
    }
  }
}

const data = readFileSync("./day-6/input.txt").toString();
const device = new CommunicationDevice();
console.log(device.findStartOfMessageMarker(data));

module.exports = CommunicationDevice;
