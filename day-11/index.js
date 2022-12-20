// const MonkeyBusiness = require("./monkeyBusiness");
// const mb = new MonkeyBusiness("./day-11/input.txt");
// console.log(mb.getHighest());

const monkeyZero = (array) => {
  console.log({ length: array.length });
  const op = array.map((x) => x * BigInt(19));
  console.log({ op });
  const test = op.map((x) => x % BigInt(23) == 0);
  console.log({ test });
};

const monkeyOne = (array) => {
  console.log({ length: array.length });
  const op = array.map((x) => x + BigInt(6));
  console.log({ op });
  const test = op.map((x) => x % BigInt(19) == 0);
  console.log({ test });
};

const monkeyTwo = (array) => {
  console.log({ length: array.length });
  const op = array.map((x) => x * x);
  console.log({ op });
  const test = op.map((x) => x % BigInt(13) == 0);
  console.log({ test });
};

const monkeyThree = (array) => {
  console.log({ length: array.length });
  const op = array.map((x) => x + BigInt(3));
  console.log({ op });
  const test = op.map((x) => x % BigInt(17) == 0);
  console.log({ test });
};

monkeyZero([1586, 28699, 35558, 118759, 68580, 178951].map((x) => BigInt(x)));
monkeyOne([21834, 25805, 29415, 29054].map((x) => BigInt(x)));
monkeyTwo([675602].map((x) => BigInt(x)));
monkeyThree(
  [30134, 545281, 2256421, 1303020, 3400069, 456438062404].map((x) => BigInt(x))
);
