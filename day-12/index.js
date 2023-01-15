const MonkeyBusiness = require("./monkeyBusiness");
const p1 = new MonkeyBusiness("./day-11/input.txt");
console.log(p1.getHighest());

const BigMonkeyBusiness = require("./bigMonkeyBusiness");
const p2 = new BigMonkeyBusiness("./day-11/input.txt");
console.log(p2.getHighest());
