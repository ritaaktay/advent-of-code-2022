const { readFileSync } = require("fs");

class CommunicationDevice {
  findStartOfPacketMarker(data) {
    console.log({ data });
    let different = data[0];
    console.log({ different });
    for (let i = 1; i < data.length; i++) {
      console.log({ i });
      console.log(!different.includes(data[i]));
      if (different.includes(data[i])) {
        const same = different.indexOf(data[i]);
        different = different.substr(same + 1);
      }
      different += data[i];
      console.log({ different });
      if (different.length == 4) return i + 1;
    }
  }
}

const data = readFileSync("./day-6/input.txt").toString();
const device = new CommunicationDevice();
// console.log(device.findStartOfPacketMarker(data));

module.exports = CommunicationDevice;
