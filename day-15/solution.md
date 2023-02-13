Parsed input to store each signal reader & beacon as an array, where index 0 & 1 are signal reader x & y, and index 2 & 3 are beacon x & y

[2, 18, -2, 15],
[9, 16, 10, 16],
[13, 2, 15, 3],
[12, 14, 10, 16],
[10, 20, 10, 16],
[14, 17, 10, 16],
...

Will add Manhattan distance at index 4, ex:

[2, 18, -2, 15, 7],
[9, 16, 10, 16, 1],
[13, 2, 15, 3, 3],
[12, 14, 10, 16, 4],
[10, 20, 10, 16, 4],
[14, 17, 10, 16, 5],
...

Quickest way to get the coordinates where there can be no beacon at a given row N:
Find the max Manhattan distance
For all rows N + max distance, N - max distances, locate the signal readers
For these signal readers, calculate their scan zone based on their closest beacon
See how many of these points have Y coordinate N
Remove duplicates! Remove coordinates where there is already a signal reader or beacon!

Can I do it without constructing a matrix, and thus deal with the negative coordiantes?

Passes test input but looping through the scan range of even one scanner for the puzzle input is incredibly slow, it has a heigh of around 600,000...

Would there be a way to not loop through all and have some math that can tell me which indices in the specified row only will be in the scan range of a given scanner?

...#... - amount, location
..###.. - amount, location
.##S##. - amount, location
..###.. - amount, location
...#... - amount, location

If I can express each row in terms of Amount and Location, I can know what part of a given row Y a given scanner S will be covering

Amount is in relation to the distance from scanner to it's nearest beacon, lets call this Range
At y-index of Scanner Amount = (Range x 2) + 1
From then on, it decreases by 2 with each row further away from the Scanner in either direction
Let's say Distance is the absolute distance from y-index of Scanner S to y-index of Row R
Distance = |y-index of Row - y-index of Scanner|
So the Amount at row X can be expressed as (Range x 2) + 1 - (Distance x 2)

The Location can be expressed as Start index-x plus Amount
At y-index of Scanner, Start is x-index of Scanner - Range
From then on, it increases by 1 with each row further away from the Scanner in either direction
Let's say Distance is the absolute distance from y-index of Scanner S to y-index of Row R
So the Start Index can be expressed as x-index of Scanner - Range + Distance

Narrowing down scanners under consideration would be to find the max range of any Scanner, and select Scanners within that range in either direction from the given Row R's Y-index

Per Scanner, we can calculate what indices of Row R will be within it's scan zone, and concatenate them in an array by not adding any duplicates to reduce size

We can filter out the Row R of the original data set and remove any indices that overlap with Scanners or Beacons, then get the length of the array as our answer
