const CommunicationDevice = require("./communicationDevice");

describe("CommunicationDevice", () => {
  it("Reports characters until first start of packet marker", () => {
    const device = new CommunicationDevice();
    expect(
      device.findStartOfPacketMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb")
    ).toEqual(7);
  });

  it("Reports characters until first start of packet marker", () => {
    const device = new CommunicationDevice();
    expect(
      device.findStartOfPacketMarker("bvwbjplbgvbhsrlpgdmjqwftvncz")
    ).toEqual(5);
  });

  it("Reports characters until first start of packet marker", () => {
    const device = new CommunicationDevice();
    expect(
      device.findStartOfPacketMarker("nppdvjthqldpwncqszvftbrmjlhg")
    ).toEqual(6);
  });

  it("Reports characters until first start of packet marker", () => {
    const device = new CommunicationDevice();
    expect(
      device.findStartOfPacketMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")
    ).toEqual(10);
  });

  it("Reports characters until first start of packet marker", () => {
    const device = new CommunicationDevice();
    expect(
      device.findStartOfPacketMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")
    ).toEqual(11);
  });
});
