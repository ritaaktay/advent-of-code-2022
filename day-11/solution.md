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

Inspection counts after Round 20 are one off
Monkey 0 inspected items 99 times
Monkey 1 inspected items 97 times
Monkey 2 inspected items 8 times // got 10 (+2)
Monkey 3 inspected items 103 times // got 104, (+1)

--- TEST CASES ---

Round 1
Monkey 0 - 60, 71, 81, 80 - I 2
Monkey 1 - 77, 1504, 1865, 6244, 3603, 9412 - I 4
Monkey 2 - [] - I 3
Monkey 3 - [] - I 6
CORRECT

Round 2
Monkey 0 - [ 83, 1510, 1871, 6250, 3609, 9418 ] - I 6
Monkey 1 - [ 1143, 1352, 1542, 1523 ] - I 10
Monkey 2 - [] - I 3
Monkey 3 - [] - I 10
CORRECT

Round 3
Monkey 0 - [ 1149, 1358, 1548, 1529 ] - I 12
Monkey 1 - [ 1580, 28693, 35552, 118753, 68574, 178945 ] - I 14
Monkey 2 - [] - I 3
Monkey 3 - [] - I 16
CORRECT


Round 4
Monkey 0 - [ 1586, 28699, 35558, 118759, 68580, 178951 ] - I 16
Monkey 1 - [ 21834, 25805, 29415, 29054 ] - I 20
Monkey 2 - [] - I 3
Monkey 3 - [] - I 20
CORRECT


Round 5
Monkey 0 - [ 1586, 28699, 35558, 118759, 68580, 178951 ] - I 16
Monkey 1 - [ 21834, 25805, 29415, 29054 ] - I 20
Monkey 2 - [] - I 3
Monkey 3 - [] - I 20
INCORRECT

(Monkey 0 throws 35558 * 19 = 675602 to Monkey 2 because divisible by 23)
Monkey 2 calculates 675602 * 675602 as 456438062407
When it is supposet to be 456438062404

Accuracy of calculation with large numbers in JavaScript?
Using BigInt
BigInt(675602) * BigInt(675602) = 456438062404n

Since the operations are where the large nubmers occur, will use BigInt there
```
