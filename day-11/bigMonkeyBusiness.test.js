const BigMonkeyBusiness = require("./bigMonkeyBusiness.js");

describe("BigMonkeyBusiness", () => {
  it("Processes one round", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    mb.oneRound();
    expect(mb.monkeys[3].items).toEqual([]); // empty from non-%LCM calculations still empty
    expect(mb.monkeys[2].items).toEqual([]); // empty from non-%LCM calculations still empty
    expect(mb.monkeys[0].inspected).toEqual(2);
    expect(mb.monkeys[1].inspected).toEqual(4);
    expect(mb.monkeys[2].inspected).toEqual(3);
    expect(mb.monkeys[3].inspected).toEqual(6);
  });

  it("Processes five rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    for (let i = 0; i < 5; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[2].items).toEqual([]); // empty from non-%LCM calculations still empty
    expect(mb.monkeys[3].items).toEqual([]); // empty from non-%LCM calculations still empty
    expect(mb.monkeys[0].inspected).toEqual(22);
    expect(mb.monkeys[1].inspected).toEqual(24);
    expect(mb.monkeys[2].inspected).toEqual(4);
    expect(mb.monkeys[3].inspected).toEqual(26);
  });

  it("Processes 20 rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    for (let i = 0; i < 20; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].inspected).toEqual(99);
    expect(mb.monkeys[1].inspected).toEqual(97);
    expect(mb.monkeys[2].inspected).toEqual(8);
    expect(mb.monkeys[3].inspected).toEqual(103);
  });

  it("Processes 1000 rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    for (let i = 0; i < 1000; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].inspected).toEqual(5204);
    expect(mb.monkeys[1].inspected).toEqual(4792);
    expect(mb.monkeys[2].inspected).toEqual(199);
    expect(mb.monkeys[3].inspected).toEqual(5192);
  });

  it("Processes 2000 rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    for (let i = 0; i < 2000; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].inspected).toEqual(10419);
    expect(mb.monkeys[1].inspected).toEqual(9577);
    expect(mb.monkeys[2].inspected).toEqual(392);
    expect(mb.monkeys[3].inspected).toEqual(10391);
  });

  it("Finds highest monkey business after 1000 rounds", () => {
    const mb = new BigMonkeyBusiness("./day-11/mock.txt");
    expect(mb.getHighest()).toEqual(2713310158);
  });
});
