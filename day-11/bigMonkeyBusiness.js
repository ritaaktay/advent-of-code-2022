const { readFileSync } = require("fs");

class BigMonkeyBusiness {
  constructor(path) {
    this.path = path;
    this.lcm = 1;
    this.rounds = 10000;
    this.monkeys = this.makeMonkeys();
  }

  getHighest() {
    for (let i = 0; i < this.rounds; i++) {
      this.oneRound();
    }
    const sorted = [...this.monkeys].sort((a, b) => b.inspected - a.inspected);
    return sorted[0].inspected * sorted[1].inspected;
  }

  oneRound() {
    this.monkeys.forEach((m) => this.takeTurn(m));
  }

  takeTurn(m) {
    m.items.forEach((i) => {
      m.inspected++;
      i = this.inspect(i, m.op) % this.lcm;
      if (i % m.test == 0) this.monkeys[m.true].items.push(i);
      else this.monkeys[m.false].items.push(i);
    });
    m.items = [];
  }

  inspect(item, op) {
    if (/old \* old/.exec(op)) return item * item;
    const multiply = /old \* (\d+)/.exec(op);
    if (multiply) return item * multiply[1];
    const add = /old \+ (\d+)/.exec(op);
    if (add) return item + parseInt(add[1]);
    throw new Error("Cannot process operation: ", op);
  }

  makeMonkeys() {
    const rows = readFileSync(this.path).toString();
    const monkeys = [...rows.matchAll(/Monkey/g)].map((m) => {
      return { inspected: 0 };
    });

    const regexp = [
      [/true: throw to monkey (\d)/g, "true"],
      [/false: throw to monkey (\d)/g, "false"],
      [/new = (old [*+] (\d+|old))/g, "op"],
      [/divisible by (\d+)/g, "test"],
      [/items: ((\d\d, )*(\d\d))/g, "items"],
    ];

    regexp.forEach(([rgxp, key]) => {
      [...rows.matchAll(rgxp)].forEach((match, i) => {
        monkeys[i][key] =
          (key == "op") | (key == "items") ? match[1] : parseInt(match[1]);
      });
    });

    monkeys.forEach((m) => {
      this.lcm *= m.test;
      m.items = m.items.split(", ").map((i) => parseInt(i));
    });

    return monkeys;
  }
}

module.exports = BigMonkeyBusiness;
