const BigMonkeyBusiness = require("./bigMonkeyBusiness.js");

describe("BigMonkeyBusiness", () => {
  it("Processes one round", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    mb.oneRound();
    expect(mb.monkeys[0].items).toEqual([
      BigInt(60),
      BigInt(71),
      BigInt(81),
      BigInt(80),
    ]);
    expect(mb.monkeys[3].items).toEqual([]);
    expect(mb.monkeys[1].items).toEqual(
      [77, 1504, 1865, 6244, 3603, 9412].map((x) => BigInt(x))
    );
    expect(mb.monkeys[2].items).toEqual([]);
    expect(mb.monkeys[0].inspected).toEqual(2);
    expect(mb.monkeys[1].inspected).toEqual(4);
    expect(mb.monkeys[2].inspected).toEqual(3);
    expect(mb.monkeys[3].inspected).toEqual(6);
  });

  it("Processes five rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    for (let i = 0; i < 4; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].items).toEqual(
      [1586, 28699, 35558, 118759, 68580, 178951].map((x) => BigInt(x))
    );
    expect(mb.monkeys[1].items).toEqual(
      [21834, 25805, 29415, 29054].map((x) => BigInt(x))
    );
    expect(mb.monkeys[2].items).toEqual([]);
    expect(mb.monkeys[3].items).toEqual([]);
    expect(mb.monkeys[0].inspected).toEqual(16);
    expect(mb.monkeys[1].inspected).toEqual(20);
    expect(mb.monkeys[2].inspected).toEqual(3);
    expect(mb.monkeys[3].inspected).toEqual(20);
  });

  xit("Processes 20 rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    for (let i = 0; i < 20; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].inspected).toEqual(99);
    expect(mb.monkeys[1].inspected).toEqual(97);
    expect(mb.monkeys[2].inspected).toEqual(8);
    expect(mb.monkeys[3].inspected).toEqual(103);
  });

  xit("Processes 1000 rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    for (let i = 0; i < 1000; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].inspected).toEqual(5204);
    expect(mb.monkeys[1].inspected).toEqual(4792);
    expect(mb.monkeys[2].inspected).toEqual(199);
    expect(mb.monkeys[3].inspected).toEqual(5192);
  });

  xit("Processes 2000 rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    for (let i = 0; i < 2000; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].inspected).toEqual(10419);
    expect(mb.monkeys[1].inspected).toEqual(9577);
    expect(mb.monkeys[2].inspected).toEqual(329);
    expect(mb.monkeys[3].inspected).toEqual(10391);
  });

  xit("Finds highest monkey business after 1000 rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    expect(mb.worry).toEqual(true);
    expect(mb.rounds).toEqual(10000);
    expect(mb.getHighest()).toEqual(2713310158);
  });
});
