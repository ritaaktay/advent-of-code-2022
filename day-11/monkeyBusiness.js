const { readFileSync } = require("fs");

class MonkeyBusiness {
  constructor(path) {
    this.path = path;
    this.monkeys = this.makeMonkeys();
  }

  getHighest() {
    this.makeRounds();
    const sorted = [...this.monkeys].sort((a, b) => b.inspected - a.inspected);
    return sorted[0].inspected * sorted[1].inspected;
  }

  makeRounds() {
    for (let i = 0; i < 20; i++) {
      this.oneRound();
    }
  }

  oneRound() {
    this.monkeys.forEach((m) => this.takeTurn(m));
  }

  takeTurn(m) {
    m.items.forEach((i) => {
      m.inspected++;
      i = Math.floor(this.inspect(i, m["op"]) / 3);
      if (i % m.test === 0) this.monkeys[m.true].items.push(i);
      else this.monkeys[m.false].items.push(i);
    });
    m.items = [];
  }

  inspect(item, op) {
    op = /(\d+) (\*|\+) (\d+)/.exec(op.replace(/old/g, item));
    if (op[2] == "+") return parseInt(op[1]) + parseInt(op[3]);
    else if (op[2] == "*") return parseInt(op[1]) * parseInt(op[3]);
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
      m.items = m.items.split(", ").map((i) => parseInt(i));
    });

    return monkeys;
  }
}

module.exports = MonkeyBusiness;
