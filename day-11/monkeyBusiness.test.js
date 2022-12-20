const MonkeyBusiness = require("./monkeyBusiness.js");

describe("MonkeyBusiness", () => {
  it("Processes one turn", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt");
    mb.takeTurn(mb.monkeys[0]);
    expect(mb.monkeys[3].items).toEqual([74, 500, 620]);
    expect(mb.monkeys[0].items).toEqual([]);
    mb.takeTurn(mb.monkeys[1]);
    expect(mb.monkeys[0].items).toEqual([20, 23, 27, 26]);
    expect(mb.monkeys[1].items).toEqual([]);
  });

  it("Processes one round", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt");
    mb.oneRound();
    expect(mb.monkeys[0].items).toEqual([20, 23, 27, 26]);
  });

  it("Finds highest monkey business", () => {
    const mb = new MonkeyBusiness("./day-11/mock.txt");
    expect(mb.getHighest()).toEqual(10605);
  });
});
