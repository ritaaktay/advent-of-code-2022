```
--- PART 1 ---

Each monkey is: an object
Stored in array of Monkeys where index is Monkey #

{
  items: [79,98]
  op: "old * 19" => "new ="
  test: 23 => "divisible by X"
  true: 2 => "throw to Monkey #"
  false: 3 => "throw to Monkey #"
  inspected: 0
}

Parsing function:
makeMonkeys()
  - Has array of regexp and keys (ex. [/divisible by (\d)+/g, "test"])
  - For each item in array, string.matchAll()
  - Each match is mapepd to monkey[indexOfMatch][key]

20 rounds
One round - all monkeys take a turn => one interation through the Monkeys array
One turn - monkey inspects all items it is holding => one iteration through items array

An item inspection:
- Increment: inspected++
- Inspection: Worry level is now op result
- Relief: Worry is divided by three and rounded down to nearest int
- Test: The divisibility is tested
- Throw: Thrown to another monkey based on divisibility result

Order of items when passed around:
- Inspection starts with first item (for loop iteration)
- Thrown item is added to the end (push)

Objective:
Find total number of times each Monkey inspects items throughout 20 rounds

Solution:
- Store inspected count in monkey object and increment at each inspection
- Process 20 rounds
- Sort Monkeys array by inspected count and get the two largest
- Multiply them to get monkey business count

makeRounds()
- For loop 20
- monkeys.each takeTurn()

takeTurn()
- monkey.items.each
  - increment m.inspected
  - calculate worry
  - test and throw
  - reset m.items to []

throw(item, monkey)
  - monkeys[monkey].items.push(item)

inspect(item, op)
  - replace "old" with item in test string
  - apply the operation
  - return result

relieve(item)
  - divide item by three
  - round down to nearest int
  - return

test(item, test)
  - return true if item is divisible by test
  - else return false
```
