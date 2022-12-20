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

--- PART 1 ---

Should be enough to loop 10000 rather than 20 and skip step of dividing by 3 on each inspection
But not getting the right answer for mocks...

--- DEBUG LOG ---

Inspection counts after Round 1 match
Monkey 0 inspected items 2 times.
Monkey 1 inspected items 4 times.
Monkey 2 inspected items 3 times.
Monkey 3 inspected items 6 times.

Inspection counts after Round 20 are one off per Monkey
Monkey 0 inspected items 99 times // got 100 (+1)
Monkey 1 inspected items 97 times // got 96 (-1)
Monkey 2 inspected items 8 times // got 9 (+1)
Monkey 3 inspected items 103 times // got 104, (+1)

Since the incrementing is simple (per item) it means that some items are beign thrown at the wrong monkeys

Inspection counts after Round 1000 are cumulatively more off per Monkey
Monkey 0 inspected items 5204 times. // got 5420 (+)
Monkey 1 inspected items 4792 times. // got 4576 (-)
Monkey 2 inspected items 199 times. // got 224 (+)
Monkey 3 inspected items 5192 times. // got 5425 (+)

Is it that Monkey 1 always gets less and others always gets more?

After round 2000
Monkey 0 inspected items 10419 times. // got 10857 (+)
Monkey 1 inspected items 9577 times. // got 9139 (-)
Monkey 2 inspected items 392 times. // got 437 (+)
Monkey 3 inspected items 10391 times. // got 10862 (+)

Why would Monkey 1 always be less whilst others are always more?
Who is throwing to Monkey 1 at what condition?
Monkey 2 throws to Monkey 1 if divisible by 13
Monkey 3 throws to Monkey 1 if NOT divisible by 17

Since mostly NOT divisible occurs, will check if the divisible by 13 is working as expected
Log

```
