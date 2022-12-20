const MonkeyBusiness = require("./monkeyBusiness.js");

describe("MonkeyBusiness", () => {
  it("Processes one turn", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", false);
    mb.takeTurn(mb.monkeys[0]);
    expect(mb.monkeys[3].items).toEqual([74, 500, 620]);
    expect(mb.monkeys[0].items).toEqual([]);
    mb.takeTurn(mb.monkeys[1]);
    expect(mb.monkeys[0].items).toEqual([20, 23, 27, 26]);
    expect(mb.monkeys[1].items).toEqual([]);
  });

  it("Processes one round without worry", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", false);
    mb.oneRound();
    expect(mb.monkeys[0].items).toEqual([20, 23, 27, 26]);
  });

  it("Finds highest monkey business after of 20 rounds", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", false);
    expect(mb.getHighest()).toEqual(10605);
  });

  it("Processes one turn with worry", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", true);
    mb.takeTurn(mb.monkeys[0]);
    console.log(mb.monkeys[3].items);
    expect(mb.monkeys[3].items).toEqual([74, 1501, 1862]);
    expect(mb.monkeys[0].items).toEqual([]);
    expect(mb.monkeys[0].inspected).toEqual(2);
    mb.takeTurn(mb.monkeys[1]);
    expect(mb.monkeys[0].items).toEqual([60, 71, 81, 80]);
    expect(mb.monkeys[3].items).toEqual([74, 1501, 1862]);
    expect(mb.monkeys[1].items).toEqual([]);
    expect(mb.monkeys[1].inspected).toEqual(4);
    mb.takeTurn(mb.monkeys[2]);
    expect(mb.monkeys[0].items).toEqual([60, 71, 81, 80]);
    expect(mb.monkeys[3].items).toEqual([74, 1501, 1862, 6241, 3600, 9409]);
    expect(mb.monkeys[1].items).toEqual([]);
    expect(mb.monkeys[2].items).toEqual([]);
    expect(mb.monkeys[2].inspected).toEqual(3);
    mb.takeTurn(mb.monkeys[3]);
    expect(mb.monkeys[0].items).toEqual([60, 71, 81, 80]);
    expect(mb.monkeys[3].items).toEqual([]);
    expect(mb.monkeys[1].items).toEqual([77, 1504, 1865, 6244, 3603, 9412]);
    expect(mb.monkeys[2].items).toEqual([]);
    expect(mb.monkeys[3].inspected).toEqual(6);
  });

  it("Processes one round with worry", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", true);
    mb.oneRound();
    expect(mb.monkeys[0].inspected).toEqual(2);
    expect(mb.monkeys[1].inspected).toEqual(4);
    expect(mb.monkeys[2].inspected).toEqual(3);
    expect(mb.monkeys[3].inspected).toEqual(6);
  });

  it.only("Processes 20 rounds with worry", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", true);
    for (let i = 0; i < 20; i++) {
      mb.oneRound();
    }
    // console.log(mb.monkeys[0].inspected);
    // console.log(mb.monkeys[1].inspected);
    // console.log(mb.monkeys[2].inspected);
    // console.log(mb.monkeys[3].inspected);
    expect(mb.monkeys[0].inspected).toEqual(99);
    expect(mb.monkeys[1].inspected).toEqual(97);
    expect(mb.monkeys[2].inspected).toEqual(8);
    expect(mb.monkeys[3].inspected).toEqual(103);
  });

  it("Processes 1000 rounds with worry", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", true);
    for (let i = 0; i < 1000; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].inspected).toEqual(5204);
    expect(mb.monkeys[1].inspected).toEqual(4792);
    expect(mb.monkeys[2].inspected).toEqual(199);
    expect(mb.monkeys[3].inspected).toEqual(5192);
  });

  it("Processes 2000 rounds with worry", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", true);
    for (let i = 0; i < 2000; i++) {
      mb.oneRound();
    }
    expect(mb.monkeys[0].inspected).toEqual(10419);
    expect(mb.monkeys[1].inspected).toEqual(9577);
    expect(mb.monkeys[2].inspected).toEqual(329);
    expect(mb.monkeys[3].inspected).toEqual(10391);
  });

  it.only("Finds highest monkey business after 1000 rounds", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt", true);
    expect(mb.worry).toEqual(true);
    expect(mb.rounds).toEqual(10000);
    expect(mb.getHighest()).toEqual(2713310158);
  });
});
